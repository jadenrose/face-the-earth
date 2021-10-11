const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')

const Show = require('../../models/Show')

// @path	GET /api/show
// @desc	get all shows
// @access	public
router.get('/', async (req, res) => {
    try {
        const shows = await Show.find().populate('artists')

        res.json({ shows })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	GET /api/show/:show_id
// @desc	get show by id
// @access	public
router.get('/:show_id', async (req, res) => {
    try {
        const show = await Show.findById(req.params.show_id).populate('artists')

        res.json({ show })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	POST /api/show
// @desc	create new show
// @access	private
router.post('/', [auth, [check('title', 'title is required').notEmpty()]])

module.exports = router
