#!/bin/bash

git checkout master
git pull origin master
docker-compose -f docker-compose.rpi.yml -d web
docker-compose -f docker-compose.rpi.yml up -d web --build
docker-compose -f docker-compose.rpi.yml restart web