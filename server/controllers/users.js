const express = require('express')
const User = require('../models/userSchema')

//DISPLAY ALL USERS
exports.display = async (req, res) => {
    const users = await User.find().select('-refreshToken')
    res.json({ isOK: 'OK', message: 'USERS FOUND', users: users})
}

//DISPLAY USER BY USERNAME
exports.findUser = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    res.json({ isOK: 'OK', message: 'USER FOUND', user: user })
}