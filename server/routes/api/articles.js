const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')

const Article = require('../../models/Article')

// @path	GET /api/articles
// @desc	get all articles
// @access	public
router.get('/', async (req, res) => {
	try {
		const articles = await Article.find().lean()

		res.json(articles)
	} catch (err) {
		res.status(500).send('server error')
	}
})

// @path	GET /api/articles/:article_id
// @desc	get article by id
// @access	private
router.get('/:article_id', auth, async (req, res) => {
	try {
		const article = await Article.findById(req.params.article_id).lean()

		if (!article)
			return res
				.status(404)
				.json({ errors: [{ msg: 'article not found' }] })

		res.json(article)
	} catch (err) {
		res.status(500).send('server error')
	}
})

// @path	POST /api/articles
// @desc	create new article
// @access	private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'title cannot be empty').optional().notEmpty(),
			check('body', 'body is required').notEmpty(),
			check('link', 'must be a valid URL').optional().isURL(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const article = new Article({ ...req.body, user: req.db.user._id })

			await article.save()

			res.json(article)
		} catch (err) {
			console.error(err)
		}
	}
)

// @path	PATCH /api/articles/:article_id
// @desc	modify article
// @access	private
router.patch(
	'/:article_id',
	[
		auth,
		[
			check('title', 'title cannot be empty').optional().notEmpty(),
			check('body', 'body is required').optional().notEmpty(),
			check('link', 'must be a valid URL').optional().isURL(),
		],
	],
	async (req, res) => {
		try {
			const article = await Article.findByIdAndUpdate(
				req.params.article_id,
				{
					$set: req.body,
				},
				{ new: true }
			)

			if (!article)
				return res
					.status(404)
					.json({ errors: [{ msg: 'article not found' }] })

			res.json(article)
		} catch (err) {
			res.status(500).send('server error')
		}
	}
)

// @path	DELETE /api/articles/:article_id
// @desc	delete article
// @access	private
router.delete('/:article_id', auth, async (req, res) => {
	try {
		const article = await Article.findByIdAndRemove(req.params.article_id)

		if (!article)
			return res
				.status(404)
				.json({ errors: [{ msg: 'article not found' }] })

		res.json({ msg: 'article removed' })
	} catch (err) {
		res.status(500).send('server error')
	}
})

// @path	DELETE /api/articles/:article_id/:field_name
// @desc	delete field from article
// @access	private
router.delete('/:article_id/:field_name', auth, async (req, res) => {
	try {
		const reqFields = Article.schema.requiredPaths()

		if (reqFields.indexOf(req.params.field_name) > -1)
			return res
				.status(400)
				.json({ errors: [{ msg: 'cannot delete a required field' }] })

		const article = await Article.findByIdAndUpdate(
			req.params.article_id,
			{
				$unset: { [req.params.field_name]: '' },
			},
			{ new: true }
		)

		if (!article)
			return res
				.status(404)
				.json({ errors: [{ msg: 'article not found' }] })

		res.json(article)
	} catch (err) {
		if (err.kind === 'ObjectId')
			return res
				.status(404)
				.json({ errors: [{ msg: 'article not found' }] })

		console.error(err)
		res.status(500).send('server error')
	}
})

module.exports = router
