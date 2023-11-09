const Users = require('../models/Users.model')

// get all logged users
exports.getLoggedUser = async (req, res) => {
	try {
		const users = await Users.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// register new User
exports.register = async (req, res) => {
	try {
		res.json({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}

// login User
exports.login = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json(err + '')
	}
}
