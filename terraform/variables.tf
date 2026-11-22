variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "deploysteps"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS deployment region"
  type        = string
  default     = "eu-west-1"
}

variable "ec2_instance_type" {
  description = "EC2 instance type for DeploySteps"
  type        = string
  default     = "c7i-flex.large"
}