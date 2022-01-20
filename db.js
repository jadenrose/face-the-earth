const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI)
		console.log('Mongoose connected...')
		return connection
	} catch (err) {
		console.error(err)
	}
}

module.exports = connectDB
