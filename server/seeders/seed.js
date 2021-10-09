const fs = require('fs').promises
const path = require('path')

const connectDB = require('../config/db')
const User = require('../models/User')

const seed = async (Model, options) => {
    try {
        const connection = await connectDB()

        const { path, encoding } = options

        const data = await fs.readFile(path, encoding)

        let count = 0
        let modelName

        for (const item of JSON.parse(data).items) {
            const model = new Model(item)

            if (!modelName) modelName = model.constructor.modelName

            await model.save()

            count++
        }

        await connection.disconnect()

        return console.log(
            `successfully inserted ${count} ${modelName}${count > 1 ? 's' : ''}`
        )
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

seed(User, {
    path: path.join(__dirname, 'users.json'),
    encoding: 'utf-8',
})
