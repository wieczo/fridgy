#!/bin/bash

git checkout master
git pull origin master
docker-compose -f docker-compose.rpi.yml up -d --build
docker-compose -f docker-compose.rpi.yml restart web