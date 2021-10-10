const fs = require('fs').promises
const path = require('path')
const prompt = require('prompt')

const connectDB = require('../config/db')

const Video = require('../models/Video')
const Show = require('../models/Show')
const Artist = require('../models/Artist')

const models = [
    {
        Model: Video,
        path: path.join(__dirname, 'videos.json'),
    },
    {
        Model: Show,
        path: path.join(__dirname, 'shows.json'),
    },
    {
        Model: Artist,
        path: path.join(__dirname, 'artists.json'),
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
        models
            .map(
                (model, i) =>
                    `  ${i + 1}) ${model.Model.collection.collectionName}`
            )
            .join('\n')
    )
    console.log('------------------')
    console.log('  a) ALL')
    console.log('  c) CANCEL\n')

    const { selection } = await prompt.get({
        properties: {
            selection: {
                description: `Seed which collection? (1-${models.length})`,
            },
        },
    })

    if (selection.toLowerCase() === 'c') return

    if (Number(selection) && Number(selection) <= models.length) {
        const collection = models[Number(selection) - 1]
        return await seed(collection.Model, collection.path)
    }

    if (selection.toLowerCase() === 'a') {
        for (const model of models) await seed(model.Model, model.path)
        return
    }

    return console.log('Invalid choice entered. Aborting.')
}

run()
