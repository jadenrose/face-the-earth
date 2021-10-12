const { Schema, model } = require('mongoose')

const VenueSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    loc: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
})

module.exports = Venue = model('venue', VenueSchema)