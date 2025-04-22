# Uploading Your Application to AWS Elastic Beanstalk

This guide explains how to upload your WAR file to AWS Elastic Beanstalk and connect it to your RDS database.

## Step 1: Build Your WAR File

1. Run the build script to create a deployable WAR file:
   ```bash
   ./build-war.sh
   ```

2. This will create a file called `teashop-backend.war` in the `target` directory.

## Step 2: Prepare for AWS Deployment

1. Log in to the AWS Management Console

2. Navigate to Elastic Beanstalk service

## Step 3: Create a New Elastic Beanstalk Application

1. Click "Create Application"

2. Fill in the details:
   - Application name: TeaShop
   - Platform: Tomcat (make sure to choose a version compatible with Java 21)
   - Application code: Upload your code

3. For "Upload your code":
   - Select "Local file"
   - Choose the WAR file from your `target` directory
   - Version label: 1.0.0 (or any version number you prefer)

4. Click "Create application"

## Step 4: Configure Environment Variables

Once your environment is created, you need to configure environment variables:

1. Go to your environment in Elastic Beanstalk

2. Click "Configuration" in the left sidebar

3. Find "Software" category and click "Edit"

4. Under "Environment properties", add the following key-value pairs:
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `RDS_HOSTNAME`: `teashop.cfm8wia2ylru.us-east-2.rds.amazonaws.com`
   - `RDS_PORT`: `3306`
   - `RDS_DB_NAME`: `teashop`
   - `RDS_USERNAME`: `admin`
   - `RDS_PASSWORD`: `TeaShop!1234`
   - `JWT_SECRET_KEY`: `a6f494dc548b1f7b4daf4e4e1fe6b2fa45c9a08612a0a1e8d429ca7a0d17cd9d`
   - `FRONTEND_URL`: `http://localhost:3000` (change this when you deploy your frontend)
   - `CORS_ALLOWED_ORIGINS`: `http://localhost:3000` (change this when you deploy your frontend)

5. Click "Apply"

## Step 5: Configure Database Connectivity

1. Make sure your RDS database security group allows incoming connections from your Elastic Beanstalk environment

2. In the AWS Console, go to RDS > Databases > teashop

3. Under "Connectivity & security", note the VPC security group

4. Click on the security group and add an inbound rule:
   - Type: MySQL/Aurora (3306)
   - Source: Custom - [Your Elastic Beanstalk security group]

## Step 6: Verify Deployment

1. Once your application is deployed (Status: "Green/Ok"), open the URL provided by Elastic Beanstalk

2. Your backend should now be accessible at this URL

3. Test your API endpoints using a tool like Postman:
   - `https://your-eb-url.elasticbeanstalk.com/user/1` (to test a GET request)

## Step 7: Connect Your Local Frontend

To connect your local frontend to your AWS backend:

1. Use the script we created earlier:
   ```bash
   ./switch-backend.sh aws https://your-eb-url.elasticbeanstalk.com
   ```

2. Run your frontend locally:
   ```bash
   npm run dev
   ```

3. Your local frontend should now be connected to your AWS-hosted backend

## Troubleshooting

If you encounter issues:

1. Check Elastic Beanstalk logs:
   - Go to your environment in Elastic Beanstalk
   - Click "Logs" in the left sidebar
   - Request "Last 100 lines of logs" or "Full logs"

2. Database connection issues:
   - Verify that your RDS endpoint is correct
   - Check that the security group allows connections from Elastic Beanstalk
   - Verify the database username and password

3. CORS issues:
   - Make sure your frontend URL is correctly set in CORS_ALLOWED_ORIGINS
   - Verify that your browser is connecting to the correct backend URL