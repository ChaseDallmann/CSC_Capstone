#!/bin/bash

# Exit on any error
set -e

echo "Building JAR file for deployment..."

# Ensure we're using the production profile
echo "Setting up production profile..."
export SPRING_PROFILES_ACTIVE=prod

# Clean previous builds and compile
echo "Cleaning and compiling..."
./mvnw clean compile

# Package as JAR
echo "Packaging as JAR file..."
./mvnw package -DskipTests

echo "JAR file built successfully at: target/teashop-backend.jar"
echo "This file is ready for deployment to AWS Elastic Beanstalk."

# Show file size
du -h target/teashop-backend.jar