const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (user) => {
    const payload = { user: user._doc }

    if (payload.user.password) delete payload.user.password

    return jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: config.get('jwtLife'),
    })
}
