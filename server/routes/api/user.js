const router = require('express').Router()

const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.post('/', auth, (req, res) => {
    try {
        res.json({ msg: 'hello' })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
