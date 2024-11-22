#!/bin/bash
set -e
cd /home/ubuntu/Woloo-Admin-1
echo "NPM install Started"
npm install --force
echo "NPM install Completed"
sudo npm cache clean --force
echo "NPM Build Started"
sudo npm run build
echo "NPM Build Completed"
sudo cp -rf build /var/www/html
echo "Build Copied to html folder"
