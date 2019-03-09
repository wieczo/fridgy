#!/bin/bash

git pull
docker-compose -f docker-compose.arm.yml up -d web
docker-compose -f docker-compose.arm.yml restart web