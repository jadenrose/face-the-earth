const path = require('path')
const crypto = require('crypto')
const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const mongoUri = process.env.MONGO_URI
const connection = mongoose.createConnection(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const auth = require('../../middleware/auth')

let gfs
connection.once('open', () => {
	gfs = new mongoose.mongo.GridFSBucket(connection.db, {
		bucketName: 'images',
	})
})

const storage = new GridFsStorage({
	url: mongoUri,
	file: (req, file) =>
		new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) return reject(err)

				const filename =
					buf.toString('hex') + path.extname(file.originalname)
				const fileInfo = {
					filename,
					bucketName: 'images',
				}

				resolve(fileInfo)
			})
		}),
})

const checkFileType = (file, cb) => {
	const filetypes = /jpeg|jpg|png|gif|mp4/
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) return cb(null, true)
	cb('filetype')
}

const store = multer({
	storage,
	limits: { fileSize: 20 * 10e6 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
})

const videoStore = multer({
	storage,
	limits: { fileSize: Number.MAX_SAFE_INTEGER },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
})

const uploadMiddleware = (req, res, next) => {
	const upload = store.array('image')

	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).json({ errors: [{ msg: 'file too large' }] })
		} else if (err) {
			if (err === 'filetype')
				return res
					.status(400)
					.json({ errors: [{ msg: 'image files only' }] })
			return res.sendStatus(500)
		}

		next()
	})
}

const videoUploadMiddleware = (req, res, next) => {
	const upload = videoStore.single('video')

	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).json(err)
		} else if (err) {
			if (err === 'filetype') return res.status(400).json('MP4s only')
			return res.sendStatus(500)
		}

		next()
	})
}

router.post('/', [auth, uploadMiddleware], (req, res) => {
	const { files } = req
	const fileIds = []

	for (const file of files) {
		const { id } = file

		if (file.size > 5 * 10e6) {
			deleteImage(id)
			return res
				.status(400)
				.json({ errors: [{ msg: 'file may not exceed 5MB' }] })
		}

		console.log('uploaded file: ', file)
		fileIds.push(file.id)
	}

	return res.json(fileIds)
})

router.post('/videos', [auth, videoUploadMiddleware], (req, res) => {
	console.log(req)
	const { video } = req

	console.log('uploaded video', video)

	res.json(video.id)
})

router.get('/', auth, (req, res) => {
	gfs.find().toArray((err, files) => {
		if (!files || !files.length)
			return res.status(400).json({ error: 'no files found' })

		res.json(files)
	})
})

router.get('/:image_id', ({ params: { image_id } }, res) => {
	if (!image_id || image_id === 'undefined')
		return res.status(400).json({ errors: [{ msg: 'no image id' }] })

	const _id = new mongoose.Types.ObjectId(image_id)

	gfs.find({ _id }).toArray((err, files) => {
		if (!files || !files.length)
			return res.status(400).json({ errors: [{ msg: 'no files found' }] })

		gfs.openDownloadStream(_id).pipe(res)
	})
})

router.delete('/:image_id', auth, ({ params: { image_id } }, res) => {
	try {
		if (!image_id || image_id === 'undefined')
			res.status(400).send('no image id')

		const _id = new mongoose.Types.ObjectId(image_id)

		gfs.delete(_id, (err) => {
			if (err) {
				if (err.message.includes('File not found'))
					return res.sendStatus(404)

				return res.status(400).send(err)
			}

			res.sendStatus(204)
		})
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
})

module.exports = router
