const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

module.exports = function (req, res, next) {
    try {
        const token = req.header('x-auth-token')
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        console.log(decoded)

        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send('server error')
    }
}
