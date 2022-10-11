const express = require('express')
const app = express()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const isAuth = async (req, res, next) => {
    let accessToken

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            accessToken = req.headers.authorization.split(' ')[1]
            const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            const currentDate = new Date()
            if (decodedAccessToken) {
                if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
                    return res.status(401).json({ isOK: 'FAIL', message: 'ACCESS TOKEN EXPIRED' })
                }
                else {
                    // req.user = await User.findById(decodedAccessToken.id.id).select('-password').select('-refreshToken')
                    // res.status(200).json({ isOK: 'OK', message: 'ACCESS TOKEN VALID' })
                    next()
                }
            }
        } catch (error) {
            return res.status(401).json({ isOK: 'FAIL', message: 'ACCESS TOKEN INVALID', error: `${error.message}` })
        }
    }

    if (!accessToken) {
        return res.status(401).json({ isOK: 'FAIL', message: 'ACCESS TOKEN NOT FOUND' })
    }
}

module.exports = isAuth