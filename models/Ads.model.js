const mongoose = require('mongoose')

const adsSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 10, maxlength: 50 },
	text: { type: String, required: true, minlength: 20, maxlength: 1000 },
	date: { type: String, required: true },
	src: { type: String, required: true },
	localization: { type: String, required: true },
	author: { type: String, required: true },
})

module.exports = mongoose.model('Ads', adsSchema)
