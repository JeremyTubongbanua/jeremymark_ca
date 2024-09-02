#!/bin/bash
git pull upstream main 
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker logs -f jeremymark_ca