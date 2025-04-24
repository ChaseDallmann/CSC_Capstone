#!/bin/bash
set -e

echo "Running post-deploy hook"

# Check if jar exists and copy it to the right location
if [ -f /var/app/current/target/teashop-backend.jar ]; then
  echo "JAR found in target directory"
  mkdir -p /var/app/current/
  cp /var/app/current/target/teashop-backend.jar /var/app/current/
  chmod 755 /var/app/current/teashop-backend.jar
fi

echo "Current directory contents:"
ls -la /var/app/current/

echo "Done with post-deploy hook"