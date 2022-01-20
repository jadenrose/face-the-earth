import axios from 'axios'

const BASE_URL = process.env.BACKEND_URI || 'http://localhost:5000'

const postBooking = async ({ name, email, venueType, date, otherInfo }) => {
	try {
		let req = {
			name,
			email,
			venueType,
			date,
		}

		if (otherInfo) req = { ...req, otherInfo }

		const res = await axios.post(`${BASE_URL}/api/bookings`, req)

		return res.data
	} catch (err) {
		return null
	}
}

export { postBooking }
