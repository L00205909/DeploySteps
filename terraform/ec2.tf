
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "web" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.ec2_instance_type
  subnet_id              = "subnet-078f74de32abb4bc7"
  vpc_security_group_ids = [aws_security_group.web.id]

  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name


  user_data = <<-EOF
  #!/bin/bash
  set -Eeuo pipefail

  # Install required packages
  dnf install -y docker git

  # Start Docker
  systemctl enable --now docker

  # Enable Systems Manager Agent
  systemctl enable --now amazon-ssm-agent

  # Install Docker Compose
  curl -fSL https://github.com/docker/compose/releases/download/v5.6.0/docker-compose-linux-x86_64 \
    -o /usr/local/bin/docker-compose

  chmod +x /usr/local/bin/docker-compose

  # Clone DeploySteps repository
  git clone --depth 1 --branch main \
    https://github.com/L00205909/DeploySteps.git \
    /opt/deploysteps

  # Verify installations
  docker --version
  docker-compose version
  git --version
  aws --version

  # Verify Docker service
  systemctl is-active docker
  EOF


  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true
  }

  metadata_options {
    http_tokens = "required"
  }

  tags = {
    Name        = "${var.project_name}-server"
    Project     = var.project_name
    Environment = var.environment
  }
}