const { Schema, model } = require('mongoose')
const { isDate } = require('validator')

const ShowSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'artist',
        },
    ],
    venue: {
        type: Schema.Types.ObjectId,
        ref: 'venue',
    },
    desc: {
        type: String,
    },
    date: {
        type: Date,
        validate: {
            validator: isDate,
            message: 'must be a valid date',
        },
    },
})

module.exports = Show = model('show', ShowSchema)
