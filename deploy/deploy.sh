
#!/bin/bash
set -Eeuo pipefail

APP_DIR="/opt/deploysteps"
COMPOSE_FILE="deploy/compose.yaml"
AWS_REGION="eu-west-1"

HEALTH_URL="http://localhost/health"
MAX_ATTEMPTS=30
SLEEP_SECONDS=2

if [[ -z "${WEB_IMAGE:-}" ]]; then
  echo "ERROR: WEB_IMAGE environment variable is required."
  exit 1
fi

cd "$APP_DIR"

ECR_REGISTRY="${WEB_IMAGE%%/*}"

# Capture the currently deployed container and image.
PREVIOUS_CONTAINER=$(WEB_IMAGE="$WEB_IMAGE" docker-compose \
  -f "$COMPOSE_FILE" ps -q web 2>/dev/null | head -n 1 || true)

PREVIOUS_IMAGE=""

if [[ -n "$PREVIOUS_CONTAINER" ]]; then
  PREVIOUS_IMAGE=$(docker inspect "$PREVIOUS_CONTAINER" \
    --format '{{.Config.Image}}' 2>/dev/null || true)
fi

echo "Previous image: ${PREVIOUS_IMAGE:-none}"
echo "New image: $WEB_IMAGE"

# Login to Amazon ECR.
echo "Logging in to Amazon ECR..."

aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$ECR_REGISTRY"

# Pull the new image.
echo "Pulling image: $WEB_IMAGE"
docker pull "$WEB_IMAGE"

# Deploy the new version.
echo "Deploying DeploySteps..."

WEB_IMAGE="$WEB_IMAGE" docker-compose \
  -f "$COMPOSE_FILE" \
  up -d --remove-orphans

# Health check function.
check_health() {
  local url="$1"

  for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do
    if curl --fail --silent "$url" > /dev/null; then
      echo "Health check passed."
      return 0
    fi

    echo "Health check attempt $attempt/$MAX_ATTEMPTS failed."
    sleep "$SLEEP_SECONDS"
  done

  return 1
}

# Verify the new deployment.
echo "Checking application health..."

if check_health "$HEALTH_URL"; then
  echo "Deployment completed successfully."
  WEB_IMAGE="$WEB_IMAGE" docker-compose -f "$COMPOSE_FILE" ps
  exit 0
fi

echo "ERROR: New deployment failed health checks."

# Roll back to the previous image.
if [[ -n "$PREVIOUS_IMAGE" ]]; then
  echo "Rolling back to: $PREVIOUS_IMAGE"

  if ! WEB_IMAGE="$PREVIOUS_IMAGE" docker-compose \
    -f "$COMPOSE_FILE" \
    up -d --remove-orphans; then
    echo "ERROR: Rollback deployment command failed."
    exit 1
  fi

  echo "Checking rollback health..."

  if check_health "$HEALTH_URL"; then
    echo "Rollback successful. Previous version is healthy."
    WEB_IMAGE="$PREVIOUS_IMAGE" docker-compose -f "$COMPOSE_FILE" ps
    exit 1
  fi

  echo "CRITICAL: Rollback health check also failed."
  WEB_IMAGE="$PREVIOUS_IMAGE" docker-compose -f "$COMPOSE_FILE" ps
  exit 1
else
  echo "ERROR: No previous image found. Rollback unavailable."
fi

WEB_IMAGE="$WEB_IMAGE" docker-compose -f "$COMPOSE_FILE" ps
exit 1
