const userModel = require('../models/user-model.js')
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


require('dotenv').config()

module.exports.authUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User does not Exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(401).json({
                message: "Invalid Creditentials"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie("token", token)
        return res.status(200).json({
            message: "User authenticated",
            email: user.email
        })
    } catch(err) {
        return res.status(500).json({
            message: "server error",
            err
        })
    }
},

module.exports.createUser = async(req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({ 
            username, 
            email, 
            password: hash,
         })

         const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
         res.cookie("token", token)

        return res.status(200).json({
            message: "Successfully Created the User",
            email: newUser.email
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }


}

module.exports.removeUser = async(req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logged out successfully" })
}