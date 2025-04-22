#!/bin/bash

# Script to switch between local and AWS backend endpoints
# Usage: ./switch-backend.sh local|aws [aws-endpoint]

MODE=$1
AWS_ENDPOINT=$2

if [ "$MODE" == "local" ]; then
  echo "Switching to local backend (http://localhost:8080)"
  echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
  echo "Local backend configured! Run 'npm run dev' to start the frontend."
elif [ "$MODE" == "aws" ]; then
  if [ -z "$AWS_ENDPOINT" ]; then
    echo "Error: AWS endpoint URL is required"
    echo "Usage: ./switch-backend.sh aws <your-eb-environment-url>"
    exit 1
  fi
  echo "Switching to AWS backend ($AWS_ENDPOINT)"
  echo "NEXT_PUBLIC_API_URL=$AWS_ENDPOINT" > .env.local
  echo "AWS backend configured! Run 'npm run dev' to start the frontend."
else
  echo "Error: Invalid mode. Use 'local' or 'aws'"
  echo "Usage: ./switch-backend.sh local|aws [aws-endpoint]"
  exit 1
fi