terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.21.0"
    }
  }
}

provider "aws" {
  # Configuration options
}
provider "aws" {
  region  = "us-east-1"
  profile = "default"
}
