const User = require('../models/User')

module.exports = async (req, res, next) => {
	const email = req.header('email')
	const password = req.header('password')

	const [err, user] = await User.getAuthenticated(email, password)

	if (!user) return res.status(err.code).json({ errors: err.array })

	req.db = {
		...req.db,
		user,
	}

	next()
}
