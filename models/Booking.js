const { Schema, model } = require('mongoose')
const { isDate, isEmail } = require('validator')

const BookingSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate: [
			{
				validator: isEmail,
				message: 'invalid email',
			},
		],
	},
	venueType: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		validate: {
			validator: isDate,
			message: 'must be a valid date',
		},
		required: true,
	},
	otherInfo: {
		type: String,
	},
})

module.exports = Booking = model('booking', BookingSchema)
