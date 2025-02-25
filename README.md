# Chat App

A real-time chat application built with React, Node.js, Express, and Socket.IO.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

## Features

- Real-time messaging with Socket.IO
- User authentication with JWT
- Profile management
- Responsive design
- Online user status

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
2. Install dependencies for both backend and frontend:
   ```bash
   npm install

## Environment Variables
Create a .env file in the backend directory and add the following environment variables:

# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

## Scripts
npm run dev: Runs both the backend and frontend servers in development mode.
npm run build: Installs dependencies and builds the frontend.
npm start: Starts the backend server.

## Technologies Used
Frontend:

React
Tailwind CSS
Axios
Zustand (state management)
React Router
Backend:

Node.js
Express
Socket.IO
MongoDB
Mongoose
JWT (JSON Web Tokens)
Cloudinary (for image uploads)
