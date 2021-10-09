const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

router.get('/', (req, res) => {
    try {
        const { email, password } = req.body

        User.getAuthenticated(email, password, function (err, user, reason) {
            if (err) throw err

            if (user) {
                const payload = {
                    user,
                }

                const token = jwt.sign(payload, config.get('jwtSecret'), {
                    expiresIn: 3600,
                })

                return res.json({ token })
            }

            console.log(`failure reason: ${reason}`)

            return res.status(401).json({ errors: [{ msg: 'login failed' }] })
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router
