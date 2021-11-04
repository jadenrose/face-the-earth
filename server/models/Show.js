const { Schema, model } = require('mongoose')
const { isDate } = require('validator')

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
})

module.exports = Show = model('show', ShowSchema)
