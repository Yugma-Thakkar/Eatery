const express = require('express')
const app = express()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//GENERATE ACCESS TOKEN
function generateAccessToken(id) {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
}

//GENERATE REFRESH TOKEN
function generateRefreshToken(id) {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET)
}

//REFRESH TOKEN
exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken
    
    //CHECK IF REFRESH TOKEN EXISTS
    if (refreshToken == null) {
        return res.status(401).json({ isOK: 'FAIL', error: `REFRESH TOKEN VALIDATION FAIL`, message: 'REFRESH TOKEN NOT FOUND' })
    }

    //VERIFY REFRESH TOKEN
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    try {
        const newAccessToken = generateAccessToken({id: decodedRefreshToken.id})
        return res.status(200).json({ isOK: 'OK', message: 'ACCESS TOKEN REFRESHED', accessToken: newAccessToken })
    } catch (error) {
        console.error(error.message)
        res.status(401).json({ isOK: 'FAIL', error: `${error.message}`, message: 'REFRESH TOKEN IS INVALID' })
    }
}

//LOGIN USER
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (user) {
            //CHECK IF PASSWORD IS CORRECT
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (isPasswordCorrect === true) {
                //ASSIGN ACCESS TOKEN
                const accessToken = generateAccessToken({id: user._id})
                //ASSIGN REFRESH TOKEN
                const refreshToken = generateRefreshToken({id: user._id})
                return res.status(200).json({ isOK: 'OK', message: 'USER LOGGED IN', accessToken: accessToken, refreshToken: refreshToken, user: user })
            }
            else {
                return res.status(401).json({ isOK: 'FAIL', message: 'INCORRECT PASSWORD' })
            }
        }
        else {
            return res.status(401).json({ isOK: 'FAIL', message: 'USER NOT FOUND' })
        }
        
    } catch (error) {
        console.error(error.message)
        return res.status(401).json({ isOK: 'FAIL', message: 'LOGIN FAIL' })
    }

}

//REGISTER USER
exports.registerUser = async (req, res) => {
    const { email, username, password: PlainTextPassword, repassword } = req.body
    const checkUser = await User.findOne({username})
    const checkEmail = await User.findOne({email})

    //CHECK IF USER ALREADY EXISTS
    if (checkUser) {
        return res.status(401).json({ isOK: 'FAIL', error: `USERNAME VALIDATION FAIL`, message: `${checkUser.username} ALREADY EXISTS` })
    }

    //CHECK IF EMAIL ALREADY EXISTS
    else if (checkEmail) {
        return res.status(401).json({ isOK: 'FAIL', error: `EMAIL VALIDATION FAIL`, message: `${checkEmail.email} ALREADY EXISTS` })
    }

    //CHECK PASSWORDS
    if (PlainTextPassword !== repassword) {
        return res.status(401).json({ isOK: 'FAIL', error: `PASSWORD VALIDATION FAIL`, message: 'PASSWORDS DO NOT MATCH' })
    }

    try {
        //HASH PASSWORD
        const password = await bcrypt.hash(PlainTextPassword, 10)
        //CREATE USER
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        return res.status(200).json({ isOK: 'OK', message: `${user.username} CREATED SUCCESSFULLY`})
    } catch (error) {
        console.error(error.message)
        return res.status(401).json({ isOK: 'FAIL', error: `${error.message}`, message: `USER REGISTRATION FAIL` })
    }
}