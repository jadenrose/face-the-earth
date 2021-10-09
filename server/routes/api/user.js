const router = require('express').Router()

const auth = require('../../middleware/auth')
const getToken = require('../../functions/getToken')

const User = require('../../models/User')

// @path	POST /api/user
// @desc	create new user
// @access	private
router.post('/', auth, async (req, res) => {
    try {
        const user = new User(req.body)

        await user.save()

        const token = getToken(user)

        res.json({ token })
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({
                errors: [{ msg: 'duplicate email' }],
            })

        // console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
