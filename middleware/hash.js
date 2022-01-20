const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10

module.exports = async function (req, res, next) {
    try {
        const password = req.body.password

        if (!password) return next()

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const hash = await bcrypt.hash(password, salt)

        req.body.password = hash

        next()
    } catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
}
