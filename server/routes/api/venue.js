const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const Venue = require('../../models/Venue')

// @path	GET /api/venue
// @desc	get all venues
// @access	public
router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find()

        res.json({ venues })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	GET /api/venue/:venue_id
// @desc	get venue by id
// @access	public
router.get('/:venue_id', async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.venue_id)

        if (!venue)
            return res
                .status(404)
                .json({ errors: [{ msg: 'venue not found' }] })

        res.json({ venue })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'venue not found' }] })
        }

        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	POST /api/venue
// @desc	create new venue
// @access	private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'name is required').notEmpty(),
            check('loc', 'location is required').notEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const venue = new Venue(req.body)

            await venue.save()

            res.json({ venue })
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

            console.error(err)
            res.status(500).send('server error')
        }
    }
)

// @path	PATCH /api/venue/:venue_id
// @desc	modify venue
// @access	public
router.patch(
    '/:venue_id',
    [
        auth,
        [
            check('name', 'name is required').optional().notEmpty(),
            check('loc', 'location is required').optional().notEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const venue = await Venue.findByIdAndUpdate(
                req.params.venue_id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )

            if (!venue)
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'venue not found' }] })

            res.json({ venue })
        } catch (err) {
            if (err.kind === 'ObjectId')
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'venue not found' }] })

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

// @path	DELETE /api/venue/:venue_id
// @desc	delete venue
// @access	public
router.delete('/:venue_id', auth, (req, res) => {
    try {
        const venue = Venue.findByIdAndRemove(req.params.venue_id)

        if (!venue)
            return res
                .status(404)
                .json({ errors: [{ msg: 'venue not found' }] })

        res.json({ msg: 'venue removed' })
    } catch (err) {
        if (err.kind === 'ObjectId')
            return res
                .status(404)
                .json({ errors: [{ msg: 'venue not found' }] })

        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
