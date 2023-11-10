const mongoose = require('mongoose')

const connectToDB = () => {
	const password = process.env.DB_PASSWORD
	const uri = `mongodb+srv://zagorskaj:${password}@cluster0.gh0ncql.mongodb.net/ADSboard?retryWrites=true&w=majority`

	// connect to DB
	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	const db = mongoose.connection

	// on success
	db.once('open', () => {
		console.log('Connected to the database')
	})

	// on error
	db.on('error', err => console.log('Error ' + err))

	}

module.exports = connectToDB
