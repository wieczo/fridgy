#!/bin/bash

git pull
docker-compose -f docker-compose.rpi.yml up -d web
docker-compose -f docker-compose.rpi.yml restart web