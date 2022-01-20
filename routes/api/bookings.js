const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const path = require('path')

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

			res.json(booking)
		} catch (err) {
			console.error(err)
			res.status(500).send('server error')
		}
	}
)

module.exports = router
