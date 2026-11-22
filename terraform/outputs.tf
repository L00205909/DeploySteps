
output "aws_region" {
  description = "AWS deployment region"
  value       = var.aws_region
}

output "ecr_repository_url" {
  description = "ECR repository URL for Docker image pushes and pulls"
  value       = aws_ecr_repository.web.repository_url
}

output "ec2_public_ip" {
  description = "Public IP address of DeploySteps EC2"
  value       = aws_instance.web.public_ip
}

output "ec2_instance_id" {
  description = "EC2 instance ID for SSM access"
  value       = aws_instance.web.id
}

output "github_actions_role_arn" {
  description = "IAM role assumed by GitHub Actions through OIDC"
  value       = aws_iam_role.github_actions.arn
}