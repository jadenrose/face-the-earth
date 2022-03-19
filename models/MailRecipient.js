const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const MailRecipientSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [
			{
				validator: isEmail,
				message: 'invalid email',
			},
		],
	},
	emailVerified: {
		type: Boolean,
		default: false,
	},
	subscribedOn: {
		type: Date,
		default: new Date(),
	},
})

module.exports = MailRecipient = model('MailRecipient', MailRecipientSchema)
