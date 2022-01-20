const fs = require('fs').promises
const path = require('path')
const prompt = require('prompt')

const connectDB = require('../config/db')

const collections = [
    {
        Model: require('../models/Video'),
        path: path.join(__dirname, 'videos.json'),
    },
    {
        Model: require('../models/Show'),
        path: path.join(__dirname, 'shows.json'),
    },
    {
        Model: require('../models/Artist'),
        path: path.join(__dirname, 'artists.json'),
    },
    {
        Model: require('../models/Venue'),
        path: path.join(__dirname, 'venues.json'),
    },
]

const seed = async (Model, path, options = {}) => {
    try {
        const connection = await connectDB()

        const { encoding = 'UTF-8' } = options

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

        if (count)
            return console.log(
                `successfully inserted ${count} ${modelName}${
                    count > 1 ? 's' : ''
                }`
            )

        return console.log('no data found, nothing inserted')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const run = async () => {
    console.log('Collections:')
    console.log(
        collections
            .map(
                (collections, i) =>
                    `  ${i + 1}) ${collections.Model.collection.collectionName}`
            )
            .join('\n')
    )
    console.log('------------------')
    console.log('  a) ALL')
    console.log('  c) CANCEL\n')

    const { selection } = await prompt.get({
        properties: {
            selection: {
                description: `Seed which collection? (1-${collections.length})`,
            },
        },
    })

    if (selection.toLowerCase() === 'c') return

    if (Number(selection) && Number(selection) <= collections.length) {
        const collection = collections[Number(selection) - 1]
        return await seed(collection.Model, collection.path)
    }

    if (selection.toLowerCase() === 'a') {
        for (const collection of collections)
            await seed(collection.Model, collection.path)
        return
    }

    return console.log('Invalid choice entered. Aborting.')
}

run()
