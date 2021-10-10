const router = require('express').Router()

const auth = require('../../middleware/auth')
const Artist = require('../../models/Artist')

router.post('/', auth, async (req, res) => {
    try {
        const artist = new Artist({
            name: req.body.name,
            link: req.body.link,
        })

        await artist.save()

        res.json({ artist })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
