resource "aws_db_subnet_group" "default" {
  name       = "${var.capstone-project}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

resource "aws_db_instance" "mysql" {
  identifier = "${var.capstone-project}-db"
  engine = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  name = "users_db"
  username = "admin"
  password = random_password.db_password.result
  skip_final_snapshot = true
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name = aws_db_subnet_group.default.name
}

resource "random_password" "db_password" {
  length = 16
  special = true
}
