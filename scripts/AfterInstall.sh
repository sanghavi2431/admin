#!/bin/bash
set -e
cd /home/ubuntu/Woloo-Admin-1

echo "Loading NVM..."
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18.20.6

echo "Node.js Version in CI/CD: $(node -v)"

echo "Cleaning up previous builds and dependencies..."
rm -rf node_modules build package-lock.json

echo "NPM install Started"
npm install

echo "NPM Build Started"
export NODE_OPTIONS="--openssl-legacy-provider"
npm run build
echo "NPM Build Completed"

cp -rf build /var/www/html
echo "Build Copied to html folder"
