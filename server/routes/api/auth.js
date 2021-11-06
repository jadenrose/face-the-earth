const router = require('express').Router()

const login = require('../../middleware/login')
const auth = require('../../middleware/auth')
const token = require('../../middleware/token')

// @path	GET /api/auth
// @desc	get token with login
// @access	public
router.get('/', [login, token], async (req, res) => {
	try {
		console.log('AUTH API BLA BLA')

		const token = res.db.token

		console.log(token)

		if (!token)
			res.status(404).json({ errors: [{ msg: 'user not found' }] })

		res.json(token)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	GET /api/auth/token
// @desc	get a fresh token
// @access	private
router.get('/token', [auth, token], async (req, res) => {
	try {
		const token = res.db.token

		if (!token)
			res.status(404).json({ errors: [{ msg: 'user not found' }] })

		res.json(token)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

module.exports = router
