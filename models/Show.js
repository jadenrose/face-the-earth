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
			validator: (val) => !val.length || isURL(val),
			message: 'must be a valid URL',
		},
	},
	desc: {
		type: String,
	},
	date: {
		type: String,
		validate: {
			validator: (val) => !val.length || isDate(val),
			message: 'must be a valid date',
		},
	},
	images: [
		{
			type: Schema.Types.ObjectId,
		},
	],
})

module.exports = Show = model('show', ShowSchema)
