require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI; // Read from .env

const connectToMongo = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURI, {
            connectTimeoutMS: 30000, // Increased timeout
            socketTimeoutMS: 60000, // Increased socket timeout
            serverSelectionTimeoutMS: 30000 // Increased server selection timeout
        })
        .then(() => {
            console.log("Connected to MongoDB");
            resolve();
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err.message); // Detailed logging
            reject(err);
        });
    });
};

module.exports = connectToMongo;
