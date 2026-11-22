
resource "aws_security_group" "web" {
  name        = "${var.project_name}-web-sg"
  description = "Security group for DeploySteps EC2"
  vpc_id      = "vpc-05b31efe15ec642db"

  ingress {
    description = "HTTP web traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}
