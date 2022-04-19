#!/bin/bash

cd web
docker build --tag web .

cd ../client/
npm run-script build
docker build . -t client

cd ..
docker-compose build && docker-compose up