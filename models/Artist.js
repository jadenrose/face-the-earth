const { Schema, model } = require('mongoose')
const { isURL } = require('validator')

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    link: {
        type: String,
        validate: {
            validator: isURL,
            message: 'must be a valid URL',
        },
    },
})

module.exports = Artist = model('artist', ArtistSchema)
