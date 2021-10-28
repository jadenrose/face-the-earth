const { Schema, model } = require('mongoose')

const ArticleSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = Article = model('article', ArticleSchema)
