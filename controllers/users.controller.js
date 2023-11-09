const Users = require('../models/Users.model')

// get all logged users
exports.getLoggedUser = async (req, res) => {
	try {
		const user = await Users.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}


