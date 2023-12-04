const mongoose = require('mongoose')

const connectToDB = () => {
	const password = process.env.DB_PASSWORD
	const uriProd = `mongodb+srv://zagorskaj:${password}@cluster0.gh0ncql.mongodb.net/ADSboard?retryWrites=true&w=majority`
	const uriDev = 'mongodb://0.0.0.0:27017/adsBoard'

	// connect to DB
	mongoose.connect(uriProd, { useNewUrlParser: true, useUnifiedTopology: true })
	const db = mongoose.connection

	// on success
	db.once('open', () => {
		console.log('Connected to the database')
	})

	// on error
	db.on('error', err => console.log('Error ' + err))
}

module.exports = connectToDB
