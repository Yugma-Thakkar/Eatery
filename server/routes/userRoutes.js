const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const userAuthMiddleware = require('../middleware/userAuthMiddleware')

//DISPLAY ALL USERS
router.get('/', userAuthMiddleware, userController.display)

//DISPLAY USER BY USERNAME
router.post('/findUser', userAuthMiddleware, userController.findUser)

module.exports = router