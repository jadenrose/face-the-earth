const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const path = require('path')

const auth = require(path.join(__dirname, '../../middleware/auth'))

const Artist = require(path.join(__dirname, '../../models/Artist'))

// @path	GET /api/artists
// @desc	get all artists
// @access	public
router.get('/', async (req, res) => {
	try {
		const artists = await Artist.find().lean()

		res.json(artists)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	GET /api/artists/:artist_id
// @desc	get artist by id
// @access	public
router.get('/:artist_id', async (req, res) => {
	try {
		const artist = await Artist.findById(req.params.artist_id)

		if (!artist)
			return res
				.status(404)
				.json({ errors: [{ msg: 'artist not found' }] })

		res.json(artist)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	POST /api/artists
// @desc	create new artist
// @access	private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'name is required').notEmpty(),
			check('link', 'URL cannot be empty').optional().notEmpty(),
			check('link', 'please enter a valid URL').optional().isURL(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const artist = new Artist({
				name: req.body.name,
				link: req.body.link,
			})

			await artist.save()

			res.json(artist)
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

// @path	PATCH /api/artists/:artist_id
// @desc	modify artist
// @access	private
router.patch(
	'/:artist_id',
	[
		auth,
		[
			check('name', 'name is required').optional().notEmpty(),
			check('link', 'URL cannot be empty').optional().notEmpty(),
			check('link', 'please enter a valid URL').optional().isURL(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const artist = await Artist.findByIdAndUpdate(
				req.params.artist_id,
				{
					$set: { ...req.body },
				},
				{ new: true }
			)

			if (!artist)
				return res
					.status(404)
					.json({ errors: [{ msg: 'artist not found' }] })

			res.json(artist)
		} catch (err) {
			if (err.kind === 'ObjectId')
				return res
					.status(404)
					.json({ errors: [{ msg: 'artist not found' }] })

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

// @path	DELETE /api/artists/:artist_id
// @desc	delete artist
// @access	private
router.delete('/:artist_id', auth, async (req, res) => {
	try {
		const artist = await Artist.findByIdAndRemove(req.params.artist_id)

		if (!artist)
			return res
				.status(404)
				.json({ errors: [{ msg: 'artist not found' }] })

		res.json({ msg: 'artist removed' })
	} catch (err) {
		if (err.kind === 'ObjectId')
			return res
				.status(404)
				.json({ errors: [{ msg: 'artist not found' }] })

		console.error(err)
		res.status(500).send('server error')
	}
})

// @path	DELETE /api/artists/:artist_id/:field_name
// @desc	delete field from artist
// @access	private
router.delete('/:artist_id/:field_name', auth, async (req, res) => {
	try {
		const reqFields = Artist.schema.requiredPaths()

		if (reqFields.indexOf(req.params.field_name) > -1)
			return res
				.status(400)
				.json({ errors: [{ msg: 'cannot delete a required field' }] })

		const artist = await Artist.findByIdAndUpdate(
			req.params.artist_id,
			{
				$unset: { [req.params.field_name]: '' },
			},
			{ new: true }
		)

		if (!artist)
			return res
				.status(404)
				.json({ errors: [{ msg: 'artist not found' }] })

		res.json(artist)
	} catch (err) {
		if (err.kind === 'ObjectId')
			return res
				.status(404)
				.json({ errors: [{ msg: 'artist not found' }] })

		console.error(err)
		res.status(500).send('server error')
	}
})

module.exports = router
