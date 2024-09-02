#!/bin/bash
git fetch
git reset --hard upstream/main
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker logs -f jeremymark_ca