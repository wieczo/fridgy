#!/bin/bash

git pull
docker-compose -f docker-compose.rpi.raspap.yml up -d web
docker-compose -f docker-compose.rpi.raspap.yml restart web