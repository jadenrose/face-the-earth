const router = require('express').Router()

const getToken = require('../../functions/getToken')
const User = require('../../models/User')

// @path	GET /api/auth
// @desc	get login token
// @access	public
router.get('/', async (req, res) => {
    try {
        const email = req.header('email')
        const password = req.header('password')

        const [err, user] = await User.getAuthenticated(email, password)

        if (!user) return res.status(err.code).json({ errors: err.array })

        const token = getToken(user)

        res.json(token)
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
