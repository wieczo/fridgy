#!/bin/bash

git checkout master
git pull origin master
docker-compose -f docker-compose.raspap.yml up --build -d
docker-compose -f docker-compose.raspap.yml restart web