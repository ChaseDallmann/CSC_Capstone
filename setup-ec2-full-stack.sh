#!/bin/bash
# This script sets up your EC2 instance to serve both frontend and backend

# Install required packages for Amazon Linux
sudo yum update -y
sudo yum install -y nginx nodejs npm

# Create directories for nginx config
sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

# Add include for sites-enabled to nginx.conf
if ! grep -q "include /etc/nginx/sites-enabled/\*.conf;" /etc/nginx/nginx.conf; then
    sudo sed -i '/http {/a \    include /etc/nginx/sites-enabled/*.conf;' /etc/nginx/nginx.conf
fi

# Configure Nginx as a reverse proxy
sudo tee /etc/nginx/sites-available/teashop.conf > /dev/null << 'EOL'
server {
    listen 80;
    server_name _;

    # Root for static files
    root /home/ec2-user/frontend;
    
    # Serve Next.js frontend
    location / {
        # Check if the file exists in the .next/server/pages directory
        try_files /public$uri /public$uri/ /.next/server/pages$uri /.next/server/pages$uri.html /.next/server/pages$uri/index.html /.next/server/pages/index.html =404;
    }

    # Handle Next.js API routes - forward to the Next.js server
    location /_next/ {
        proxy_pass http://localhost:3000/_next/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Proxy all /api requests to the Spring Boot backend
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
sudo ln -sf /etc/nginx/sites-available/teashop.conf /etc/nginx/sites-enabled/teashop.conf

# Create frontend directory if it doesn't exist
mkdir -p ~/frontend

# Start/restart Nginx
sudo service nginx restart

# Setup script to run the Next.js frontend
cat > ~/run-frontend.sh << 'EOL'
#!/bin/bash
cd ~/frontend
npm install --omit=dev
npx next start -p 3000
EOL

chmod +x ~/run-frontend.sh

# Setup service for the frontend (Amazon Linux uses init.d)
sudo tee /etc/init.d/teashop-frontend > /dev/null << 'EOL'
#!/bin/bash
# chkconfig: 2345 95 20
# description: TeaShop Frontend Service

# Source function library
. /etc/rc.d/init.d/functions

USER="ec2-user"
DAEMON="/home/ec2-user/run-frontend.sh"
DAEMON_NAME="teashop-frontend"

start() {
    echo "Starting $DAEMON_NAME..."
    su - $USER -c "cd /home/ec2-user/frontend && $DAEMON > /home/ec2-user/frontend/frontend.log 2>&1 &"
    echo "$DAEMON_NAME started"
}

stop() {
    echo "Stopping $DAEMON_NAME..."
    PID=$(ps aux | grep "npm start" | grep -v grep | awk '{print $2}')
    if [ -n "$PID" ]; then
        kill $PID
        echo "$DAEMON_NAME stopped"
    else
        echo "$DAEMON_NAME not running"
    fi
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    status)
        if pgrep -f "npm start" >/dev/null; then
            echo "$DAEMON_NAME is running"
        else
            echo "$DAEMON_NAME is not running"
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0
EOL

sudo chmod +x /etc/init.d/teashop-frontend
sudo chkconfig --add teashop-frontend
sudo chkconfig teashop-frontend on

# Create a script to update the frontend
cat > ~/update-frontend.sh << 'EOL'
#!/bin/bash
mkdir -p ~/frontend
cd ~/frontend
rm -rf .next
unzip -o ~/frontend.zip
sudo service teashop-frontend restart
EOL

chmod +x ~/update-frontend.sh

# Start the frontend service
sudo service teashop-frontend start

echo "================================================================="
echo "Setup complete! To deploy your frontend:"
echo "1. Build your frontend: npm run build"
echo "2. Zip the build: zip -r frontend.zip .next package.json package-lock.json public next.config.mjs"
echo "3. Upload to EC2: scp frontend.zip ec2-user@44.204.26.211:~/"
echo "4. SSH to EC2 and run: ./update-frontend.sh"
echo "================================================================="