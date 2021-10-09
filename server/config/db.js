const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config.get('mongoURI'))
        console.log('Mongoose connected...')
        return connection
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB
