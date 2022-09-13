const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const userAuthController = require('../controllers/userAuth')

//LOGIN USER
router.post('/', userAuthController.loginUser) 