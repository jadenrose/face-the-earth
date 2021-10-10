const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 1000 * 3600

const LOGIN_ERROR = {
    code: 401,
    array: [
        {
            msg: 'login failed',
        },
    ],
}

const SERVER_ERROR = {
    code: 500,
    array: [
        {
            msg: 'internal server error',
        },
    ],
}

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: (value) => isEmail(value),
                message: 'invalid email',
            },
        ],
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    lockUntil: {
        type: Number,
    },
})

UserSchema.virtual('isLocked').get(function () {
    return this.lockUntil && this.lockUntil > Date.now()
})

UserSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (err) {
        console.error(err)
        return null
    }
}

UserSchema.methods.incLoginAttempts = async function () {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        await this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 },
        })

        return this
    }

    const updates = { $inc: { loginAttempts: 1 } }

    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked)
        updates.$set = { lockUntil: Date.now() + LOCK_TIME }

    await this.updateOne(updates)
    return this
}

UserSchema.statics.getAuthenticated = async function (email, password) {
    try {
        const user = await this.findOne({ email })

        if (!user) return [LOGIN_ERROR, null]

        if (user.isLocked) return [LOGIN_ERROR, null]

        const isMatch = await user.comparePassword(password)

        if (isMatch) {
            if (!user.loginAttempts && !user.lockUntil) return [null, user]

            const updates = {
                $set: { loginAttempts: 0 },
                $unset: { lockUntil: 1 },
            }

            await user.updateOne(updates)

            return [null, user]
        }

        await user.incLoginAttempts()

        return [LOGIN_ERROR, null]
    } catch (err) {
        console.error(err)
        return [SERVER_ERROR, null]
    }
}

module.exports = User = model('user', UserSchema)
