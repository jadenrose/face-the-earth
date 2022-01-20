import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllVenues = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/api/venues`)

		state.status = 'success'
		state.error = null
		state.list = res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postVenue = async ({ name, locationName, locationAddress, placeId }) => {
	try {
		const token = store.user.token
		if (!token) throw 'not authorized'

		let req = { name, locationName, locationAddress, placeId }

		const res = await axios.post(`${BASE_URL}/api/venues`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.status = 'success'
		state.error = ''
		state.list.push(res.data)

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const editVenue = async (
	venueId,
	{ name, locationName, locationAddress, placeId }
) => {
	try {
		const token = store.user.token
		if (!token) throw 'not authorized'

		let req = { name, locationName, locationAddress, placeId }

		const res = await axios.patch(
			`${BASE_URL}/api/venues/${venueId}`,
			req,
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		const venueIndex = state.list.findIndex(
			(venue) => venue._id === res.data._id
		)

		state.list[venueIndex] = res.data

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const searchPlaces = async (query = 'red deer') => {
	try {
		const uri = encodeURI(`${BASE_URL}/api/maps/${query}`)

		const res = await axios.get(uri)

		return res.data
	} catch (err) {
		console.error(err)
		return []
	}
}

export default readonly(state)

export { storeAllVenues, postVenue, editVenue, searchPlaces }
