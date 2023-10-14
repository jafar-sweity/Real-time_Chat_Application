#!/bin/bash
set -e

sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs curl -y

cd /home/ubuntu
git clone https://github.com/jafar-sweity/Real-time_Chat_Application.git  app

cd app && npm install
npm run dev

sudo mv ./infrastructure/app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable app.service
sudo reboot
