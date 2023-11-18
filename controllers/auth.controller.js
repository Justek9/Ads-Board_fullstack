const User = require('../models/Users.model')
const bcrypt = require('bcryptjs')
const getImageFileType = require('../utils/getImageFileType')
const fs = require('fs')
const escape = require('../utils/escapeFunc')

// register new User
exports.register = async (req, res) => {
	try {
		let { login, password, tel } = req.body
		tel = Number(tel)
		login = escape(login)
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn'
		const avatar = req.file.filename

		if (
			login &&
			password &&
			avatar &&
			tel &&
			typeof login === 'string' &&
			typeof password === 'string' &&
			['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
			typeof tel === 'number' &&
			req.file.size <= 1048576
		) {
			const userWithLogin = await User.findOne({ login })
			if (userWithLogin) {
				// delete photo from uploads folder
				const path = `public/uploads/${avatar}`
				fs.unlinkSync(path)
				res.status(409).send({ message: 'User with such login already exists' })
				return
			}
			const newUser = new User({ login, password: await bcrypt.hash(password, 10), avatar, tel })
			await newUser.save()
			res.status(201).send({ message: 'User created: ' + newUser.login })
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
					req.session.user = {
						login: user.login,
						id: user._id,
					}
					res.status(200).send({ message: 'Login successful' })
				} else {
					res.status(401).send({ message: 'Login or password is incorrect' })
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' })
		}
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}

// logout user
exports.logout = async (req, res) => {
	try {
		await req.session.destroy()
		res.send({ message: 'You have been logged out successfully' })
	} catch (err) {
		res.status(401).json({ message: err.message })
	}
}
