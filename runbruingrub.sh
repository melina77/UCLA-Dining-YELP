#!/bin/bash

# Navigate to the backend directory
cd server

# Install necessary dependencies
npm install bcrypt jsonwebtoken express sequelize cors multer jwt-decode react react-router-dom

#prompt the user to enter the API key and put it in .env
read -p 'Enter API Key: ' api_key
sed -i 's/SECRET_KEY=.*/SECRET_KEY='$api_key'/' ./server/.env

# Start the backend server (‘&’ to run in the background)
node index.js &

# Navigate back to the root directory (while that ^^ background command runs)
cd ..

# Install necessary dependencies for frontend
npm install

# Start the frontend server
npm start
