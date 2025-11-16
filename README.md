           Project Title
 Capstone App – Production-Ready Node.js + MySQL Web Application

  Short Description  
This project is a containerized Node.js application connected to a MySQL database, deployed on AWS using Terraform.  
It uses Docker, Docker-Compose, GitHub Actions, and AWS EC2 + ALB to provide a full CI/CD pipeline.



Architecture Diagram
               flowchart
    Dev[Developer Machine] --> GH[GitHub Repository]
    GH --> GA[GitHub Actions CI/CD]
    GA --> DH[Docker Hub Image Registry]

    GA --> TF[Terraform Apply on AWS]

    subgraph AWS
        ALB[Application Load Balancer]
        EC2[EC2 Instance Running Docker]
        RDS[(MySQL RDS)]
    end

    

                  VPC
    subgraph VPC["AWS VPC (10.0.0.0/16)"]
    
              Public Subnet 1
        subgraph Pub1["Public Subnet 1 (10.0.1.0/24)"]
            IGW["Internet Gateway"]
            ALB["Application Load Balancer"]
        end

                    Public Subnet 2
        subgraph Pub2["Public Subnet 2 (10.0.2.0/24)"]
            NAT["NAT Gateway"]
        end

                   Private Subnet 1
        subgraph Priv1["Private Subnet 1 (10.0.3.0/24)"]
            EC2["EC2 Instance (Docker App)"]
        end

                     Private Subnet 2
        subgraph Priv2["Private Subnet 2 (10.0.4.0/24)"]
            RDS["RDS MySQL 8.0 (Multi-AZ)"]
        end

    end

    GH["GitHub Actions CI/CD Pipeline"]
    DH["Docker Hub Registry"]

    
    IGW --> ALB
    ALB --> EC2
    EC2 --> RDS

    EC2 --> NAT
    NAT --> IGW

    CI/CD Flow
    GH --> DH
    GH --> EC2
    

   Run Locally (Using Docker Compose)
  1: clone the repo 
 git clone <your-repo-url>
 cd capstone-app
 2:create .env file
 DB_HOST=mysql
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=capstone
PORT=3000
3:start services
docker-compose up -d --build
4:Access app
http://localhost:3000


       Security Considerations

Private Subnets used for MySQL RDS (no public exposure)

Security Groups restrict MySQL access only from EC2

No hardcoded credentials — all secrets stored in GitHub Secrets

IAM least privilege for Terraform deployment

ALB terminates public traffic, EC2 is private behind the load balancer

Environment variables used for sensitive configurations

Public url: http://52.53.128.157/