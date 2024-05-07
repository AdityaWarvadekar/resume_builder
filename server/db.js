const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: "C:/Users/Admin/Desktop/Resume_Builder/resume_builder/server/.env"});

const URI = process.env.MONGO_URI;

const connectToMongo = async()=>{
    await mongoose.connect(URI, console.log("connection to db successfull"));
}

module.exports = connectToMongo;