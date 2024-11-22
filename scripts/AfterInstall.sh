#!/bin/bash
set -e
PIDS=$(ps -aef | grep "node /home/ubuntu/Woloo-Admin*/bin/app.js" | grep -v grep | awk '{print $2}')
if [ -n "$PIDS" ]; then
    for PID in $PIDS; do
        sudo kill -9 $PID
        echo "Killed Node server with PID $PID"
    done
else
    echo "No Node server processes found."
fi
cd /home/ubuntu/Woloo-Admin-1
echo "NPM install Started"
npm install
echo "NPM install Completed"
sudo npm cache clean --force
echo "NPM Build Started"
sudo npm run build
echo "NPM Build Completed"
sudo cp -rf build /var/www/html
echo "Build Copied to html folder"
