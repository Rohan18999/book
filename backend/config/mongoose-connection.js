const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

require('dotenv').config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))
}

module.exports = connectDB

