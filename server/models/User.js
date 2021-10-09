const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 1000 * 3600

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

UserSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            user.password = hash

            next()
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

UserSchema.methods.incLoginAttempts = function (callback) {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update(
            {
                $set: { loginAttempts: 1 },
                $unset: { lockUntil: 1 },
            },
            callback
        )
    }

    const updates = { $inc: { loginAttempts: 1 } }

    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked)
        updates.$set = { lockUntil: Date.now() + LOCK_TIME }

    return this.update(updates, callback)
}

const reasons = (UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2,
})

UserSchema.statics.getAuthenticated = function (email, password, callback) {
    this.findOne({ email }, function (err, user) {
        if (err) return callback(err)

        if (!user) return callback(null, null, reasons.NOT_FOUND)

        if (user.isLocked)
            return user.incLoginAttempts(function (err) {
                if (err) return callback(err)
                return callback(null, null, reasons.MAX_ATTEMPTS)
            })

        user.comparePassword(password, function (err, isMatch) {
            if (err) return callback(err)

            if (isMatch) {
                if (!user.loginAttempts && !user.lockUntil)
                    return callback(null, user)

                const updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 },
                }

                return user.update(updates, function (err) {
                    if (err) return callback(err)
                    return callback(null, user)
                })
            }

            user.incLoginAttempts(function (err) {
                if (err) return callback(err)
                return callback(null, null, reasons.PASSWORD_INCORRECT)
            })
        })
    })
}

module.exports = User = model('user', UserSchema)
