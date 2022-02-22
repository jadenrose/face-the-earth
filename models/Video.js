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
		index: {
			unique: true,
		},
	},
	desc: String,
	category: String,
	displayPosition: {
		type: Number,
		required: true,
	},
})

module.exports = Video = model('video', VideoSchema)
