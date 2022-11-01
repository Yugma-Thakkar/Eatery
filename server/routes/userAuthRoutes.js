const express = require('express')
// const app = express()
const router = express.Router()
// const jwt = require('jsonwebtoken')
// const User = require('../models/userSchema')
const userAuthController = require('../controllers/userAuth')

//REFRESH TOKEN
router.post('/refreshToken', userAuthController.refreshToken)

//LOGIN USER
router.post('/', userAuthController.loginUser) 

//REGISTER
router.post('/register', userAuthController.registerUser)

module.exports = router