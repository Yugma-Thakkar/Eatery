//IMPORT .ENV FILE
require('dotenv').config()

//IMPORT EXPRESS
const express = require('express')
const app = express()

// //IMPORT CORS FOR CROSS ORIGIN RESOURCE SHARING
// const cors = require('cors')
// app.use(cors())

//IMPORT MONGOOSE
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => console.log('MongoDB connection established'))

//IMPORT JSON WEB TOKEN
const jwt = require('jsonwebtoken')

//PARSE DATA
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//IMPORT ROUTES
const userAuthRoutes = require('./routes/userAuthRoutes')
const userRoutes = require('./routes/userRoutes')

//USE ROUTES
app.use('/userAuth', userAuthRoutes)
app.use('/user', userRoutes)

//SET UP SERVER
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})

