const Users = require('../models/Users.model')

// get all logged users
exports.getLoggedUser = async (req, res) => {
	try {
		if (req.session.user) {
			res.json(req.session.user)
		}
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
