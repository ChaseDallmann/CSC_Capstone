# AWS Deployment Guide for Tea Shop Application

This guide outlines the steps to deploy the Tea Shop application to AWS using Elastic Beanstalk and RDS.

## Prerequisites

- AWS account with appropriate permissions
- AWS CLI installed and configured
- EB CLI installed
- Java 21 JDK
- Maven
- Node.js (for frontend)

## Step 1: Create RDS Database

1. Log in to AWS Management Console
2. Navigate to RDS service
3. Click "Create database"
4. Choose MySQL engine
5. Fill in the following details:
   - DB instance identifier: teashop
   - Master username: admin
   - Master password: TeaShop!1234
   - DB instance class: db.t3.micro (or appropriate size)
   - Storage: 20 GB (or as needed)
   - VPC: Default VPC
   - Public access: Yes (for development; consider "No" for production)
   - Initial database name: teashop
6. Create the database

Your RDS endpoint is: teashop.cfm8wia2ylru.us-east-2.rds.amazonaws.com

## Step 2: Prepare Application for Deployment

1. Build your application:
   ```bash
   mvn clean package -DskipTests
   ```

2. Build frontend (Next.js):
   ```bash
   npm run build
   ```

## Step 3: Deploy to Elastic Beanstalk

1. Initialize EB CLI in your project (if not already done):
   ```bash
   eb init
   ```
   Follow the prompts to select your region, application name, and platform (Corretto 21).

2. Create an environment:
   ```bash
   eb create teashop-env
   ```

3. Configure environment variables (or use the .ebextensions files already created):
   ```bash
   eb setenv RDS_HOSTNAME=teashop.cfm8wia2ylru.us-east-2.rds.amazonaws.com \
             RDS_PORT=3306 \
             RDS_DB_NAME=teashop \
             RDS_USERNAME=admin \
             RDS_PASSWORD=TeaShop!1234 \
             JWT_SECRET_KEY=a6f494dc548b1f7b4daf4e4e1fe6b2fa45c9a08612a0a1e8d429ca7a0d17cd9d
   ```

4. Deploy your application:
   ```bash
   eb deploy
   ```

## Step 4: Configure Frontend

After deployment, update your frontend configuration to point to your Elastic Beanstalk endpoint:

1. Get your Elastic Beanstalk URL:
   ```bash
   eb status
   ```

2. Update the frontend API URL in your Next.js app to point to the Elastic Beanstalk endpoint

## Step 5: Verify Deployment

1. Open your Elastic Beanstalk URL to verify the backend is running
2. Check the RDS database to ensure tables were created correctly
3. Test your frontend against the deployed backend

## Troubleshooting

- Check Elastic Beanstalk logs: `eb logs`
- SSH into your environment: `eb ssh`
- View RDS logs through AWS RDS console
- For database initialization issues, you may need to manually import the schema:
  ```bash
  mysql -h teashop.cfm8wia2ylru.us-east-2.rds.amazonaws.com -P 3306 -u admin -p teashop < teashop.sql
  ```

## Important Security Notes

- Consider using AWS Secrets Manager for database credentials in production
- Enable HTTPS for both frontend and backend in production
- Restrict RDS access to your Elastic Beanstalk security group only
- Set up proper IAM roles and policies

## Clean Up

To avoid incurring charges, remember to terminate resources when not needed:
```bash
eb terminate teashop-env
```

Then delete your RDS instance from the AWS RDS console.