const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')

const Show = require('../../models/Show')

// @path	GET /api/shows
// @desc	get all shows
// @access	public
router.get('/', async (req, res) => {
	try {
		const shows = await Show.find().populate('artists').populate('venue')

		res.json(shows)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	GET /api/shows/:show_id
// @desc	get show by id
// @access	public
router.get('/:show_id', async (req, res) => {
	try {
		const show = await Show.findById(req.params.show_id)
			.populate('artists')
			.populate('venue')

		if (!show)
			return res.status(404).json({ errors: [{ msg: 'show not found' }] })

		res.json(show)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	POST /api/shows
// @desc	create new show
// @access	private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'title is required').notEmpty(),
			check('artists', 'no artists selected').custom((artists) => {
				console.log(typeof artists, artists.length)
				return typeof artists === 'object' && artists.length
			}),
			check('venue', 'venue is required').notEmpty(),
			check('date', 'valid date required').isDate({
				format: 'MM-DD-YYYY',
			}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const show = new Show(req.body)

			await show.save()

			await show.populate('artists venue')

			res.json(show)
		} catch (err) {
			console.error(err)
			res.status(500).send('server error')
		}
	}
)

// @path	PATCH /api/shows/:show_id
// @desc	modify show
// @access	private
router.patch(
	'/:show_id',
	[
		auth,
		[
			check('title', 'title is required').optional().notEmpty(),
			check('artists', 'no artists selected')
				.optional()
				.custom((artists) => {
					console.log(typeof artists, artists.length)
					return typeof artists === 'object' && artists.length
				}),
			check('venue', 'venue is required').optional().notEmpty(),
			check('date', 'valid date required').optional().isDate(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const show = await Show.findByIdAndUpdate(
				req.params.show_id,
				{
					$set: req.body,
				},
				{ new: true }
			)

			if (!show)
				return res
					.status(404)
					.json({ errors: [{ msg: 'show not found' }] })

			await show.populate('artists venue')

			res.json(show)
		} catch (err) {
			console.error(err)
			res.status(500).send('server error')
		}
	}
)

// @path	DELETE /api/shows/:show_id
// @desc	delete show
// @access	private
router.delete('/:show_id', auth, async (req, res) => {
	try {
		const show = await Show.findByIdAndRemove(req.params.show_id)

		if (!show)
			return res.status(404).json({ errors: [{ msg: 'show not found' }] })

		res.json({ msg: 'show removed' })
	} catch (err) {
		if (err.kind === 'ObjectId')
			return res.status(404).json({ errors: [{ msg: 'show not found' }] })

		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	DELETE /api/shows/:show_id/:field_name
// @desc	delete field from show
// @access	private
router.delete('/:show_id/:field_name', auth, async (req, res) => {
	try {
		const reqFields = Show.schema.requiredPaths()

		if (reqFields.indexOf(req.params.field_name) > -1)
			return res
				.status(400)
				.json({ errors: [{ msg: 'cannot delete a required field' }] })

		const show = await Show.findByIdAndUpdate(
			req.params.show_id,
			{
				$unset: { [req.params.field_name]: '' },
			},
			{ new: true }
		)

		if (!show)
			return res.status(404).json({ errors: [{ msg: 'show not found' }] })

		res.json(show)
	} catch (err) {
		if (err.kind === 'ObjectId')
			return res.status(404).json({ errors: [{ msg: 'show not found' }] })

		console.error(err)
		res.status(500).send('server error')
	}
})

module.exports = router
