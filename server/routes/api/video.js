const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
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

// @path	GET /api/video/:video_id
// @desc	get video by id
// @access	public
router.get('/:video_id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.video_id)

        if (!video)
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })

        res.json({ video })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })
        }

        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	POST /api/video
// @desc	create new video
// @access	private
router.post(
    '/',
    [
        auth,
        [
            check('url', 'invalid URL').isURL(),
            check('title', 'title is required').notEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const video = new Video(req.body)

            await video.save()

            res.json({ video })
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

// @path	PATCH /api/video/:video_id
// @desc	modify video
// @access	public
router.patch(
    '/:video_id',
    [
        auth,
        [
            check('url', 'invalid URL').optional().isURL(),
            check('title', 'title is required').optional().notEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const video = await Video.findByIdAndUpdate(
                req.params.video_id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )

            if (!video)
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'video not found' }] })

            res.json({ video })
        } catch (err) {
            if (err.kind === 'ObjectId')
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'video not found' }] })

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

// @path	DELETE /api/video/:video_id
// @desc	delete video
// @access	public
router.delete('/:video_id', auth, async (req, res) => {
    try {
        const video = await Video.findByIdAndRemove(req.params.video_id)

        if (!video)
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })

        res.json({ msg: 'video removed' })
    } catch (err) {
        if (err.kind === 'ObjectId')
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })

        console.error(err)
        res.status(500).send('server error')
    }
})

// @path	DELETE /api/video/:video_id/:field_name
// @desc	delete field from video
// @access	private
router.delete('/:video_id/:field_name', auth, async (req, res) => {
    try {
        const reqFields = Video.schema.requiredPaths()

        if (reqFields.indexOf(req.params.field_name) > -1)
            return res
                .status(400)
                .json({ errors: [{ msg: 'cannot delete a required field' }] })

        const video = await Video.findByIdAndUpdate(
            req.params.video_id,
            {
                $unset: { [req.params.field_name]: '' },
            },
            { new: true }
        )

        if (!video)
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })

        res.json(video)
    } catch (err) {
        if (err.kind === 'ObjectId')
            return res
                .status(404)
                .json({ errors: [{ msg: 'video not found' }] })

        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
