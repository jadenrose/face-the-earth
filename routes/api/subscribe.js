const path = require('path')
const router = require('express').Router()

const MailRecipient = require(path.join(
	__dirname,
	'../../models/MailRecipient'
))

router.post('/', async ({ body: { email } }, res) => {
	try {
		const mailRecipient = new MailRecipient({ email })

		await mailRecipient.save()

		res.sendStatus(204)
	} catch (err) {
		if (err.name === 'MongoServerError' && err.code === 11000) {
			return res.json('already subscribed')
		}

		console.error(err)
		res.sendStatus(500)
	}
})

module.exports = router
