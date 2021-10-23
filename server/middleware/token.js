const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const user = req.db.user

    if (user.password) delete user.password

    const token = jwt.sign(user, config.get('jwtSecret'), {
        expiresIn: config.get('jwtLife'),
    })

    res.db = {
        token,
    }

    next()
}
