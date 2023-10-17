#!/bin/bash

# Create a non-root user
sudo useradd -m -s /bin/bash appuser

# Switch to the non-root user
sudo su - appuser

# Set the environment variable for the repository URL
export REPO_URL="https://github.com/jafar-sweity/Real-time_Chat_Application.git"

# Clone the Git repository and install dependencies
cd /home/appuser
git clone $REPO_URL app
cd app
npm install

# Install PM2 for process management
npm install pm2 -g

# Start the Node.js application using PM2
pm2 start npm --name "chat-app" -- start

# Create a systemd service unit file
sudo tee /etc/systemd/system/chat-app.service << EOF
[Unit]
Description=Chat Application Service
After=network.target

[Service]
User=appuser
Environment=NODE_ENV=production
ExecStart=/home/appuser/app/node_modules/.bin/pm2 start chat-app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable the service
sudo systemctl daemon-reload
sudo systemctl enable app.service
sudo reboot
