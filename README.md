# Chat App

A real-time chat application built with React, Node.js, Express, and Socket.IO.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [License](#license)

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
   # Chat App

A real-time chat application built with React, Node.js, Express, and Socket.IO.


1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
2. Install dependencies for both backend and frontend:
   ```bash
   npm install
   
## Usage
Development
To run the application in development mode, use the following command:
```bash
npm run dev
This will start both the backend and frontend servers concurrently.

Production
To build the frontend and start the backend server, use the following commands:
```bash
npm run build
npm start

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
## License

### Additional Notes:

1. **Replace Placeholder Values**:
   - Replace `yourusername` in the clone URL with your actual GitHub username.
   - Replace `your_mongodb_connection_string`, `your_jwt_secret_key`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, and `your_cloudinary_secret_key` with your actual values.

2. **Ensure Dependencies**:
   - Make sure all dependencies mentioned in the `README.md` are installed and configured correctly in your project.

3. **Update License**:
   - If you have a different license, update the license section accordingly.

This `README.md` provides a comprehensive guide for setting up and running your chat application.
### Additional Notes:

1. **Replace Placeholder Values**:
   - Replace `yourusername` in the clone URL with your actual GitHub username.
   - Replace `your_mongodb_connection_string`, `your_jwt_secret_key`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, and `your_cloudinary_secret_key` with your actual values.

2. **Ensure Dependencies**:
   - Make sure all dependencies mentioned in the `README.md` are installed and configured correctly in your project.

3. **Update License**:
   - If you have a different license, update the license section accordingly.

This `README.md` provides a comprehensive guide for setting up and running your chat application.
