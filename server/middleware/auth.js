const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

module.exports = async function (req, res, next) {
    try {
        const token = req.headers['x-auth-token']

        const decoded = jwt.verify(token, config.get('jwtSecret'))

        const user = await User.findById(decoded._id).lean()

        if (!user)
            return res
                .status(401)
                .json({ errors: [{ msg: 'not authenticated' }] })

        req.db = { user }

        next()
    } catch (err) {
        if (
            err.name === 'JsonWebTokenError' ||
            err.name === 'TokenExpiredError'
        )
            return res
                .status(401)
                .json({ errors: [{ msg: 'not authenticated' }] })

        console.error(err)
        return res.status(500).send('server error')
    }
}
