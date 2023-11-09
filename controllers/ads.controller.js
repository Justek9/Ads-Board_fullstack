const Ads = require('../models/Ads.model')

exports.getAll = async (req, res) => {
	try {
		res.json({message:"OK"})
	} catch (err) {
		res.status(500).json({ message: err })
	}
}

exports.getById = async (req, res) => {
	try {
		res.send({ message: 'OK' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}

exports.getBySearchPhrase = async (req, res) => {
	try {
		res.send({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}

exports.add = async (req, res) => {
	try {
		res.send({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}

exports.delete = async (req, res) => {
	try {
		res.send({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}

exports.edit = async (req, res) => {
	try {
		res.send({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}
