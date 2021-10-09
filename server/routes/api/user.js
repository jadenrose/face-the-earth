const router = require('express').Router()

const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @path	POST /api/user
// @desc	create new user
// @access	private
router.post('/', auth, async (req, res) => {
    try {
        const user = new User(req.body)

        await user.save()

        res.json({ user })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
