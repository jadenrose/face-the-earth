const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (user) => {
    const payload = { ...user }

    if (payload.password) delete payload.password

    return jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: config.get('jwtLife'),
    })
}
