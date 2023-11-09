const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	login: { type: string, required: true },
	password: { type: String, required: true },
	avatar: { type: String, required: true },
	tel: { type: Number, required: true },
})

module.exports = mongoose.model('Users', usersSchema)
