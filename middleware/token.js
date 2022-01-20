const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const user = req.db.user

	if (user.password) delete user.password

	const token = jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: Number(process.env.JWT_LIFE),
	})

	res.db = {
		token,
	}

	next()
}
