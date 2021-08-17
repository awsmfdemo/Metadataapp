#!/bin/bash -xe
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Install github
sudo yum update -y
sudo yum install git -y

# Install Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local

# Setup application and start application
su -l ec2-user
git clone https://github.com/awsmfdemo/Metadataapp.git /home/ec2-user/Metadataapp
npm install -g pm2
cd /home/ec2-user/Metadataapp
pm2 start /home/ec2-user/Metadataapp/Server.js -i 3