#!/bin/sh
set -e

sudo apt update
sudo apt upgrade -y

sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

# install docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker pull jafarsw/real-time-chat:latest
sudo docker run -it -e DB_HOST='final-project.ccft9dbis2c2.eu-west-2.rds.amazonaws.com'  -e DB_PORT=3306  -e DB_USER_NAME=admin -e DB_PASSWORD="12345678" -e DB_NAME='final_project' -e JWT_SECRET='jafrias12ws@39dJXNI@12eiqe9u5casd' -e PORT=80 -d -p 80:80 jafarsw/real-time-chat:latest

sudo groupadd docker
sudo usermod -aG docker $(whoami)

sudo systemctl enable docker.service
sudo systemctl enable containerd.service
sudo systemctl start docker.service
sudo systemctl start containerd.service


<<<<<<<<< Temporary merge branch 1
[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable the service
sudo systemctl daemon-reload
sudo systemctl enable app.service

sudo reboot

=========
>>>>>>>>> Temporary merge branch 2
