#!/bin/bash
set -e

apt update
apt -y upgrade
apt install nginx git -y

if [ -d "/var/www/cloud-web/.git" ]; then
    cd /var/www/cloud-web
    git pull
else
    cd /var/www
    git clone <repo URL>
fi

sed -i 's|/var/www/html|/var/www/cloud-web|g' /etc/nginx/sites-available/default

systemctl enable --now nginx
systemctl reload nginx
