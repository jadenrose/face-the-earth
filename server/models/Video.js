const { Schema, model } = require('mongoose')

const VideoSchema = new Schema({
    url: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    title: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    desc: {
        type: String,
    },
})

module.exports = Video = model('video', VideoSchema)
