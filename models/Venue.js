const { Schema, model } = require('mongoose')

const VenueSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
	},
	locationName: {
		type: String,
		required: true,
	},
	locationAddress: {
		type: String,
		required: true,
	},
	placeId: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
	},
})

module.exports = Venue = model('venue', VenueSchema)
