#!/bin/bash
set -e
cd /home/ubuntu/Woloo-Admin-1

echo "Cleaning up previous builds and dependencies..."
rm -rf node_modules build package-lock.json

echo "NPM install Started"
npm install

echo "NPM Build Started"
npm run build
echo "NPM Build Completed"

cp -rf build /var/www/html
echo "Build Copied to html folder"
