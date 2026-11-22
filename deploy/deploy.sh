
#!/bin/bash
set -Eeuo pipefail

APP_DIR="/opt/deploysteps"
AWS_REGION="eu-west-1"

if [[ -z "${WEB_IMAGE:-}" ]]; then
  echo "ERROR: WEB_IMAGE environment variable is required."
  exit 1
fi

cd "$APP_DIR"

ECR_REGISTRY="${WEB_IMAGE%%/*}"

echo "Logging in to Amazon ECR..."

aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$ECR_REGISTRY"

echo "Pulling image: $WEB_IMAGE"

docker pull "$WEB_IMAGE"

echo "Deploying DeploySteps..."

WEB_IMAGE="$WEB_IMAGE" docker-compose \
  -f deploy/compose.yaml \
  up -d --remove-orphans

echo "Deployment completed."

docker-compose -f deploy/compose.yaml ps
