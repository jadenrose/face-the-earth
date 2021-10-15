const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const hash = require('../../middleware/hash')
const getToken = require('../../functions/getToken')

const User = require('../../models/User')

// @path	GET /api/user
// @desc	get all users
// @access	private
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password -loginAttempts')

        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	GET /api/user/:user_id
// @desc	get user by id
// @access	private
router.get('/:user_id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id).select(
            '-password -loginAttempts'
        )

        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	POST /api/user
// @desc	create new user
// @access	private
router.post(
    '/',
    [
        auth,
        [
            check('email', 'email cannot be empty').notEmpty(),
            check('email', 'please enter a valid email').isEmail(),
            check(
                'password',
                'password must be between 6 and 14 characters long'
            ).isLength({ min: 6, max: 14 }),
        ],
        hash,
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const user = new User(req.body)

            await user.save()

            const token = getToken(user)

            res.json(token)
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    errors: Object.entries(err.keyValue).map(([key, value]) => {
                        return {
                            msg: `the ${key} "${value}" is already taken`,
                        }
                    }),
                })
            }

            // console.error(err)
            res.status(500).send('server error')
        }
    }
)

// @path	PATCH /api/user
// @desc	modify existing user
// @access	private
router.patch(
    '/:user_id',
    [
        check('email', 'email cannot be empty').optional().notEmpty(),
        check('email', 'please enter a valid email').optional().isEmail(),
        check('password', 'password must be between 6 and 14 characters long')
            .optional()
            .isLength({ min: 6, max: 14 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const user = await User.findByIdAndUpdate(
                req.params.user_id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )

            if (!user)
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'user not found' }] })

            const token = getToken(user)

            res.json(token)
        } catch (err) {
            if (err.kind === 'ObjectId')
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'user not found' }] })

            if (err.code === 11000) {
                return res.status(400).json({
                    errors: Object.entries(err.keyValue).map(([key, value]) => {
                        return {
                            msg: `the ${key} "${value}" is already taken`,
                        }
                    }),
                })
            }

            console.error(err)
            res.status(500).send('server error')
        }
    }
)

// @path	DELETE /api/user/:user_id
// @desc	delete user
// @access	private
router.delete('/:user_id', auth, async (req, res) => {
    try {
        if (req.db.user.id === req.params.user_id)
            return res.status(400).json({
                errors: [{ msg: 'user cannot delete their own account' }],
            })

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

// @path	DELETE /api/user/:user_id/:field_name
// @desc	delete field from user
// @access	private
router.delete('/:user_id/:field_name', auth, async (req, res) => {
    try {
        const reqFields = User.schema.requiredPaths()

        if (reqFields.indexOf(req.params.field_name) > -1)
            return res
                .status(400)
                .json({ errors: [{ msg: 'cannot delete a required field' }] })

        const user = await User.findByIdAndUpdate(
            req.params.user_id,
            {
                $unset: { [req.params.field_name]: '' },
            },
            { new: true }
        )

        if (!user)
            return res.status(404).json({ errors: [{ msg: 'user not found' }] })

        res.json(user)
    } catch (err) {
        if (err.kind === 'ObjectId')
            return res.status(404).json({ errors: [{ msg: 'user not found' }] })

        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
