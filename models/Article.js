const { Schema, model } = require('mongoose')
const { isURL } = require('validator')

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
	linkLabel: {
		type: String,
		default: 'click here',
	},
	linkURL: {
		type: String,
		validate: {
			validator: isURL,
			message: 'must be a valid URL',
		},
	},
	displayPosition: {
		type: Number,
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
