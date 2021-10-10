const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const hash = require('../../middleware/hash')
const getToken = require('../../functions/getToken')

const User = require('../../models/User')

// @path	POST /api/user
// @desc	create new user
// @access	private
router.post(
    '/',
    [
        auth,
        [
            check('email', 'please enter a valid email').isEmail(),
            check(
                'password',
                'password must be between 6 and 14 characters long'
            ).isLength({ min: 6, max: 14 }),
        ],
        hash,
    ],
    async (req, res) => {
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
    }
)

// @path	PUT /api/user
// @desc	modify existing user
// @access	private
router.put(
    '/:user_id',
    [
        auth,
        [
            check(
                'password',
                'password must be between 6 and 14 characters long'
            ).isLength({ min: 6, max: 14 }),
        ],
        hash,
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.params.user_id)

            if (!user)
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'user not found' }] })

            await user.updateOne({
                $set: {
                    name: req.body.name,
                    password: req.body.password,
                },
            })

            const token = getToken(user)

            res.json({ token })
        } catch (err) {
            if (err.kind === 'ObjectId')
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'user not found' }] })

            console.error(err)
            res.status(500).send('server error')
        }
    }
)

// @path	DELETE /api/user
// @desc	delete user
// @access	private
router.delete('/:user_id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.user_id)

        if (!user)
            return res.status(404).json({ errors: [{ msg: 'user not found' }] })

        res.json({ msg: 'user removed' })
    } catch (err) {
        if (err.kind === 'ObjectId')
            return res.status(404).json({ errors: [{ msg: 'user not found' }] })

        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
