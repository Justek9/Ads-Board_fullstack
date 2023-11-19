const Session = require('../models/sessionModel')
const authMiddleware = (req, res, next) => {
	if (req.session.user) {
		return next()
	}

	if (process.env.NODE_ENV !== 'production') {
		Session.findOne().then((session, err) => {
			if (err || !session) {
				res.status(401).send({ message: 'You are not authorized' })
			} else {
				const sessionData = JSON.parse(session.session)
				const user = {
					id: sessionData.user.id,
					login: sessionData.user.login,
				}

				req.session.user = user
				req.sessionID = session._id
				return next()
			}
		})
	}
}
module.exports = authMiddleware
