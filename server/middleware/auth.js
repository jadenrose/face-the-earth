const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

module.exports = async function (req, res, next) {
    try {
        const token = req.header('x-auth-token')
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        const user = await User.findById(decoded.user._id)

        if (!user)
            return res
                .status(401)
                .json({ errors: [{ msg: 'not authenticated' }] })

        console.log(user.id)

        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError')
            return res
                .status(401)
                .json({ errors: [{ msg: 'not authenticated' }] })

        console.error(err)
        return res.status(500).send('server error')
    }
}
