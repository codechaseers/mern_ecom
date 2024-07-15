const express = require('express');
const app = require("./app")
const dotenv = require('dotenv');
const dbconn = require('./config/db_conn');
const cloudinary = require('cloudinary').v2;

// Load environment variables
dotenv.config( );

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Database connection
dbconn();

// Define a simple route
app.get('/', (req, res) => {
    console.log('Server started');
    res.status(200).json({ message: 'Hi from ecomeerse the server' });
});

// Server port defined using environment variable
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not specified

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`);
    // console.log(process.env.DB_URL);
});
