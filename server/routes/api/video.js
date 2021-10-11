const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const Video = require('../../models/Video')

// @path	GET /api/video
// @desc	get all videos
// @access	public
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find()

        res.json({ videos })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
