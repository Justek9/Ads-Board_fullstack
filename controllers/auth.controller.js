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
		const { login, password } = req.body

		if (login && password && typeof login === 'string' && typeof password === 'string') {
			const user = await User.findOne({ login })
			if (!user) {
				return res.status(400).send({ message: 'Login or password is incorrect' })
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					res.status(200).send({ message: 'Login successful' })
				} else {
					res.status(400).send({ message: 'Login or password is incorrect' })
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' })
		}
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
