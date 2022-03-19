const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const { readFile } = require('fs/promises')
const path = require('path')
const mailgun = require('mailgun-js')
const handlebars = require('handlebars')

const Booking = require(path.join(__dirname, '../../models/Booking'))

// @path	POST /api/bookings
// @desc	post a booking
// @access	public
router.post(
	'/',
	[
		check('name', 'name is required').notEmpty(),
		check('email', 'email is required').notEmpty(),
		check('venueType', 'venueType is required').notEmpty(),
		check('date', 'date is required').notEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const booking = new Booking(req.body)

			await booking.save()

			const mg = mailgun({
				apiKey: process.env.MAILGUN_API_KEY,
				domain: process.env.MAILGUN_DOMAIN,
			})

			const { name, email, venueType, date, otherInfo } = booking

			const str = await readFile(
				path.join(__dirname, '../../emailTemplate.html'),
				'utf-8'
			)

			const template = handlebars.compile(str)
			const html = template({ name, email, venueType, date, otherInfo })

			mg.messages().send({
				from: `${name} <${email}>`,
				to: 'info@facetheearth.ca',
				subject: 'New Booking - Face the Earth',
				html,
			})

			res.json(booking)
		} catch (err) {
			console.error(err)
			res.status(500).send('server error')
		}
	}
)

module.exports = router
