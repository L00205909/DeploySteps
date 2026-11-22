# DeploySteps 



### From Code to Production — Automated with DevOps

DeploySteps is a practical DevOps project developed for the assignment.

It demonstrates how a web application can be built, tested, security-scanned, containerised, deployed to AWS and monitored through an automated CI/CD workflow.

The project uses GitHub Actions, Docker, Terraform, AWS, Prometheus and Grafana to demonstrate the main stages of modern software delivery.

---

## 1. Project Objectives

The main objectives are to:

- Manage source code using Git and GitHub.
- Automate application builds and testing.
- Integrate static code analysis and security scanning.
- Containerise the application using Docker.
- Provision cloud infrastructure using Terraform.
- Automate deployment to AWS.
- Monitor application metrics using Prometheus and Grafana.
- Provide a repeatable and secure deployment process.

## 2. Technology Stack

| Category | Technologies |
|---|---|
| Source Code Management | Git, GitHub |
| Frontend | JavaScript, Vite |
| CI/CD | GitHub Actions |
| Automated Testing | Vitest |
| Static Code Analysis | ESLint |
| Dependency Security | npm audit |
| Container Security | Trivy |
| Containerisation | Docker |
| Container Orchestration | Docker Compose |
| Container Registry | Amazon ECR |
| Cloud Platform | AWS EC2 |
| Infrastructure as Code | Terraform |
| Authentication | GitHub OIDC |
| Deployment | AWS Systems Manager (SSM) |
| Web Server | Nginx |
| Monitoring | Prometheus |
| Visualisation | Grafana |
| Metrics Exporter | Nginx Prometheus Exporter |

---

## 3. System Architecture

The following diagram illustrates the main application delivery and monitoring flow.

```text
                   DEVELOPER
                       |
                       v
                GitHub Repository
                       |
                       v
                GitHub Actions
                       |
          +------------+------------+
          |            |            |
          v            v            v
        ESLint       Vitest      npm audit
          |            |            |
          +------------+------------+
                       |
                       v
                   Vite Build
                       |
                       v
                Docker Image Build
                       |
                       v
                   Trivy Scan
                       |
                       v
                   Amazon ECR
                       |
                 GitHub OIDC
                       |
                       v
              AWS Systems Manager
                       |
                       v
                    AWS EC2
                       |
                 Docker Compose
                       |
          +------------+------------+
          |            |            |
          v            v            v
         Nginx      Prometheus    Grafana
          |
          v
     Web Application

     Nginx Exporter
          |
          v
      Prometheus
          |
          v
       Grafana
```

## 4. CI/CD Pipeline

The CI/CD workflow is implemented using GitHub Actions and configured in:

`.github/workflows/ci.yml`

The workflow automates the validation, image-building, security-scanning and deployment process.

### Stage 1 — Source Code Management

**Tools: Git and GitHub**

- Source code is maintained in a GitHub repository.
- Feature branches are used to develop changes.
- Pull Requests provide a structured approach to merging changes.
- Meaningful commits maintain a traceable development history.
- Git tags identify project releases.

**Repository:** https://github.com/L00205909/DeploySteps

### Stage 2 — Automated Builds and Testing

**Tools: GitHub Actions, npm, Vite and Vitest**

The pipeline performs the following operations:

1. Checks out the repository.
2. Sets up the Node.js environment.
3. Installs dependencies using `npm ci`.
4. Runs ESLint checks.
5. Executes automated unit tests using Vitest.
6. Builds the frontend application using Vite.

The project includes unit tests for the progress calculation functionality.

### Stage 3 — Static Code Analysis and Security Scanning

**Tools: ESLint, npm audit and Trivy**

Security and code quality checks are integrated into the pipeline.

- **ESLint:** Identifies JavaScript code quality issues.
- **npm audit:** Checks project dependencies for known vulnerabilities.
- **Trivy:** Scans the Docker image for known vulnerabilities.

The Trivy security check is configured to fail when HIGH or CRITICAL vulnerabilities are detected.

These checks act as quality gates before deployment.

### Stage 4 — Containerisation and Orchestration

**Tools: Docker and Docker Compose**

The application is packaged into a Docker image using a multi-stage Dockerfile.

The runtime image uses an unprivileged Nginx container.

Docker Compose manages the application and monitoring services.

The repository contains separate Compose configurations for local development and production deployment.

### Stage 5 — Cloud Deployment

**Platform: Amazon Web Services (AWS)**

The production application is deployed to an AWS EC2 instance.

The deployment process uses:

- Amazon ECR to store Docker images.
- GitHub OIDC to authenticate GitHub Actions with AWS.
- AWS Systems Manager to execute deployment commands.
- Docker Compose to update the running application.

**Deployment process:**

1. GitHub Actions authenticates with AWS using OIDC.
2. The Docker image is built and scanned.
3. The image is pushed to Amazon ECR.
4. GitHub Actions sends a deployment command through AWS Systems Manager.
5. EC2 pulls the new image from ECR.
6. Docker Compose updates the running application.

SSH access is not required for the deployment process.

### Stage 6 — Monitoring and Logging Integration

**Tools: Prometheus, Grafana, Nginx Prometheus Exporter and Docker**

The monitoring stack provides visibility into the deployed application.

**Prometheus**

- Collects metrics from the Nginx Prometheus Exporter.
- Scrapes exporter metrics.
- Stores metrics for querying and visualisation.

**Grafana**

- Uses Prometheus as its data source.
- Provides an Nginx monitoring dashboard.
- Visualises metrics such as active connections and HTTP request activity.

**Logging**

Docker Compose logs can be inspected using:

```bash
docker compose logs
```

Individual services can also be inspected:

```bash
docker compose logs web
docker compose logs prometheus
docker compose logs grafana
```

Grafana and Prometheus are not publicly exposed. Administrative access to Grafana is available through AWS Systems Manager port forwarding.

---

## 5. Cloud Infrastructure and Infrastructure as Code

The AWS infrastructure is provisioned and managed using Terraform.

### AWS Services

| Service | Purpose |
|---|---|
| Amazon EC2 | Hosts the application and monitoring stack |
| Amazon ECR | Stores Docker container images |
| AWS IAM | Manages permissions and roles |
| AWS Systems Manager | Provides secure instance management and deployment |
| GitHub OIDC | Enables keyless authentication from GitHub Actions |

### Terraform-managed resources

- EC2 instance
- ECR repository
- IAM roles and policies
- EC2 instance profile
- Security Group
- ECR lifecycle policy

Terraform helps make infrastructure provisioning repeatable and version-controlled.

---

## 6. Security Architecture

Security is considered throughout the delivery process.

- GitHub Actions authenticates with AWS through OIDC rather than long-lived AWS access keys.
- ECR image push permissions are scoped to the project repository, except for the required ECR authorization token permission.
- EC2 uses an IAM instance profile.
- AWS Systems Manager is used instead of public SSH access.
- The Security Group exposes HTTP traffic on port 80.
- Grafana and Prometheus are bound to localhost on the EC2 instance.
- Trivy scans Docker images for HIGH and CRITICAL vulnerabilities.
- The Docker runtime uses an unprivileged Nginx container.

---

## 7. Running the Project Locally

### Prerequisites

- Git
- Node.js and npm
- Docker Desktop
- Docker Compose

### Clone the repository

```bash
git clone https://github.com/L00205909/DeploySteps.git

cd DeploySteps
```

### Install dependencies

```bash
npm ci
```

### Start the development server

```bash
npm run dev
```

### Run unit tests

```bash
npm test
```

### Run static analysis

```bash
npm run lint
```

### Build the application

```bash
npm run build
```

### Start the local Docker Compose environment

```bash
docker compose up --build -d
```

### Check running containers

```bash
docker compose ps
```

### View logs

```bash
docker compose logs
```

### Stop the environment

```bash
docker compose down
```

---

## 8. Repository Structure

```text
DeploySteps/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── deploy/
│   ├── compose.yaml
│   └── deploy.sh
│
├── monitoring/
│   ├── prometheus.yml
│   ├── dashboards/
│   └── provisioning/
│
├── nginx/
│   └── default.conf
│
├── src/
│   ├── assets/
│   ├── main.js
│   ├── style.css
│   ├── progress.js
│   └── progress.test.js
│
├── terraform/
│   ├── iam.tf
│   └── ...
│
├── Dockerfile
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md
```

---

## 9. Future Improvements

Potential enhancements include:

- Configure HTTPS with a custom domain.
- Add automated deployment health checks and rollback handling.
- Introduce monitoring alert rules and notifications.
- Integrate centralised log aggregation.
- Add integration and end-to-end tests.

---

## 10. Project Information

**Project:** DeploySteps  
**Repository:** [GitHub — DeploySteps](https://github.com/L00205909/DeploySteps)  
**Cloud Platform:** Amazon Web Services  
**AWS Region:** eu-west-1  
**Application:** Web application hosted on AWS EC2

---

## About

DeploySteps is a hands-on DevOps project developed as part of a Postgraduate Diploma in Computing (DevOps).

It demonstrates the practical implementation of CI/CD automation, infrastructure as code, containerisation, cloud deployment, security scanning and monitoring.
