#!/bin/bash

# Exit on any error
set -e

echo "Building WAR file for deployment..."

# Ensure we're using the production profile
echo "Setting up production profile..."
export SPRING_PROFILES_ACTIVE=prod

# Clean previous builds and compile
echo "Cleaning and compiling..."
./mvnw clean compile

# Package as WAR
echo "Packaging as WAR file..."
./mvnw package -DskipTests

echo "WAR file built successfully at: target/teashop-backend.war"
echo "This file is ready for deployment to AWS Elastic Beanstalk."

# Show file size
du -h target/teashop-backend.war