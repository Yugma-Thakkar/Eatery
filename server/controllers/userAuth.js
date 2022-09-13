const express = require('express')
const app = express()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//LOGIN USER
exports.loginUser = (req, res) => {
    const { email, password } = req.body

    try {
        const user = User.findOne({ email })
        
    } catch (error) {
        console.error(error.message)
        res.status(404).json({ isOK: 'OK', message: 'LOGIN FAIL' })
    }

}