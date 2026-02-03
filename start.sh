#!/bin/bash

# create ./public/images directory if it doesnt exit

if [ ! -d "./public/images" ]; then
    mkdir -p ./public/images
    echo "created directory: ./public/images"
else
    echo "Directory already exist: ./public/images"
fi

# start the application
npm start
