const User = require('../models/Users.model')
const bcrypt = require('bcryptjs')

// register new User
exports.register = async (req, res) => {
	try {
		const { login, password, avatar, tel } = req.body
		if (
			login &&
			password &&
			avatar &&
			tel &&
			typeof login === 'string' &&
			typeof password === 'string' &&
			typeof avatar === string &&
			typeof tel === 'number'
		) {
			const userWithLogin = await User.findOne({ login })
			if (userWithLogin) {
				res.status(409).send({ message: 'User with sucj login already exists' })
				return
			}

			const newUser = new User({ login, password: await bcrypt.hasj(password, 10), avatar, tel })
			await newUser.save()
			res.status(201).send({ message: 'User created' + '' + newUser.login })
		} else res.status(400).send({ message: 'Bad request' })
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
