const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectToDB = require('./db')
const dotenv = require('dotenv').config()
const path = require('path')

// start express server
const app = express()
const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...')
})

// connect to DB
connectToDB()

// add midllwares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' })
})

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, '/client/build')))


