#!/bin/bash
# Simple setup script for EC2 Amazon Linux 2
# Run this as ec2-user on your instance

echo "=== Starting EC2 setup ==="

# Step 1: Update system packages
echo "Updating system packages..."
sudo yum update -y
sudo yum install -y nginx nodejs npm

# Step 2: Configure Nginx
echo "Setting up Nginx..."
sudo tee /etc/nginx/conf.d/teashop.conf > /dev/null << 'EOL'
server {
    listen 80;
    server_name _;
    
    # Root directory for static files
    root /home/ec2-user/frontend;
    
    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Handle Next.js static files
    location /_next/static/ {
        alias /home/ec2-user/frontend/.next/static/;
        expires 1y;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Step 3: Create directories
echo "Creating directories..."
mkdir -p ~/frontend
mkdir -p ~/backend

# Step 4: Create update scripts
echo "Creating update scripts..."

# Frontend update script
cat > ~/update-frontend.sh << 'EOL'
#!/bin/bash
echo "Updating frontend..."
cd ~/frontend
unzip -o ~/frontend.zip
sudo service nginx restart
cd ~/.
echo "Frontend updated!"
EOL
chmod +x ~/update-frontend.sh

# Backend update script
cat > ~/update-backend.sh << 'EOL'
#!/bin/bash
echo "Updating backend..."
cd ~/backend
# Stop existing backend if running
pkill -f "java -jar teashop-backend.jar" || true
# Start backend in background
nohup java -jar teashop-backend.jar > backend.log 2>&1 &
echo "Backend started with PID: $!"
cd ~/.
echo "Backend updated!"
EOL
chmod +x ~/update-backend.sh

# Start services
echo "Starting services..."
sudo service nginx start
sudo chkconfig nginx on

echo "=== Setup Complete! ==="
echo "Now upload your files with:"
echo "1. Frontend: scp -i your-key.pem frontend.zip ec2-user@3.86.142.14:~/"
echo "2. Backend: scp -i your-key.pem target/teashop-backend-0.0.1-SNAPSHOT.jar ec2-user@3.86.142.14:~/backend/teashop-backend.jar"
echo ""
echo "Then run:"
echo "  ./update-frontend.sh"
echo "  ./update-backend.sh"
echo ""
echo "Your site will be available at: http://3.86.142.14"