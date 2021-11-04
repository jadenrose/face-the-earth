import axios from 'axios'

const postBooking = async ({ name, email, venueType, date, otherInfo }) => {
	try {
		let req = {
			name,
			email,
			venueType,
			date,
		}

		console.log(req)

		if (otherInfo) req = { ...req, otherInfo }

		const res = await axios.post('http://localhost:5000/api/bookings', req)

		return res.data
	} catch (err) {
		return null
	}
}

export { postBooking }
