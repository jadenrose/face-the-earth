const { Schema, model } = require('mongoose')
const { default: isDate } = require('validator/lib/isDate')
const { default: isURL } = require('validator/lib/isURL')

const ShowSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	artists: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'artist',
			},
		],
		required: true,
	},
	venue: {
		type: Schema.Types.ObjectId,
		ref: 'venue',
		required: true,
	},
	link: {
		type: String,
		validate: {
			validator: isURL,
			message: 'must be a valid URL',
		},
	},
	category: String,
	desc: {
		type: String,
	},
	date: {
		type: String,
		validate: {
			validator: isDate,
			message: 'must be a valid date',
		},
		required: true,
	},
	images: [
		{
			type: Schema.Types.ObjectId,
		},
	],
})

module.exports = Show = model('show', ShowSchema)
