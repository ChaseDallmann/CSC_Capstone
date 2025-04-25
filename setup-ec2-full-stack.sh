#!/bin/bash
# This script sets up your EC2 instance to serve both frontend and backend

# Install required packages
sudo apt-get update
sudo apt-get install -y nginx nodejs npm

# Configure Nginx as a reverse proxy
sudo tee /etc/nginx/sites-available/teashop.conf > /dev/null << 'EOL'
server {
    listen 80;
    server_name _;

    # Serve the Next.js frontend
    location / {
        root /home/ec2-user/frontend/.next/server/pages;
        try_files $uri $uri.html $uri/index.html =404;
    }

    # Serve static files
    location /_next/static/ {
        alias /home/ec2-user/frontend/.next/static/;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Proxy requests to the Spring Boot backend
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

# Enable the Nginx site
sudo ln -sf /etc/nginx/sites-available/teashop.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Start/restart Nginx
sudo systemctl restart nginx

# Setup script to run the Next.js frontend
cat > ~/run-frontend.sh << 'EOL'
#!/bin/bash
cd ~/frontend
npm install --omit=dev
npx next start -p 3000
EOL

chmod +x ~/run-frontend.sh

# Setup systemd service for the frontend
sudo tee /etc/systemd/system/teashop-frontend.service > /dev/null << 'EOL'
[Unit]
Description=TeaShop Frontend
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/home/ec2-user/frontend
ExecStart=/home/ec2-user/run-frontend.sh
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=teashop-frontend

[Install]
WantedBy=multi-user.target
EOL

# Create a script to update the frontend
cat > ~/update-frontend.sh << 'EOL'
#!/bin/bash
cd ~/frontend
rm -rf .next
unzip -o frontend.zip
sudo systemctl restart teashop-frontend
EOL

chmod +x ~/update-frontend.sh

# Enable and start the frontend service
sudo systemctl enable teashop-frontend
sudo systemctl start teashop-frontend

echo "================================================================="
echo "Setup complete! To deploy your frontend:"
echo "1. Build your frontend: npm run build"
echo "2. Zip the build: zip -r frontend.zip .next package.json package-lock.json public next.config.mjs"
echo "3. Upload to EC2: scp frontend.zip ec2-user@44.204.26.211:~/"
echo "4. SSH to EC2 and run: ./update-frontend.sh"
echo "================================================================="