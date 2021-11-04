const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const Booking = require('../../models/Booking')

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

			console.log(booking)

			await booking.save()

			res.json(booking)
		} catch (err) {
			console.error(err)
			res.status(500).send('server error')
		}
	}
)

module.exports = router
