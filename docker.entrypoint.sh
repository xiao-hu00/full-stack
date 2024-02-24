#!/bin/sh

sed -i "s|http://127.0.0.1:8080|g" /etc/nginx/conf.d/default.conf;

cat /etc/nginx/conf.d/default.conf;

nginx -g 'daemon off;';