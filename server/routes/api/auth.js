const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

// @path	GET /api/auth
// @desc	get login token
// @access	public
router.get('/', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.getAuthenticated(email, password)

        if (!user)
            return res.status(401).json({ errors: [{ msg: 'login failed' }] })

        const payload = { user: user._doc }

        delete payload.user.password

        const token = jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000,
        })

        res.json({ token })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
