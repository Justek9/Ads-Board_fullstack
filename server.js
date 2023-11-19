const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectToDB = require('./db')
const dotenv = require('dotenv').config()
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// import routes
const adsRoutes = require('./routes/ads.routes')
const usersRoutes = require('./routes/users.routes')
const authRoutes = require('./routes/auth.routes')

// start express server
const app = express()
const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...')
})

// connect to DB
connectToDB()

// add midllwares
if (process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: ['http://localhost:3000', 'http://localhost:8000'],
			credentials: true,
		})
	)
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create(mongoose.connection),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV == 'production',
		},
		unset: 'destroy',
	})
)

// add routes
app.use('/api/', adsRoutes) // add ads routes to server
app.use('/api/auth', usersRoutes) // add users routes to server
app.use('/api/auth', authRoutes) // add auth routes to server

// Serve static files
app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, '/client/build')))

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' })
})
