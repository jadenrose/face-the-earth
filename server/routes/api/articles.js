const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')

const Article = require('../../models/Article')
const User = require('../../models/User')

// @path	POST /api/article
// @desc	create new article
// @access	private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'title cannot be empty').optional().notEmpty(),
            check('body', 'body is required').notEmpty(),
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

module.exports = router
