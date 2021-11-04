import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllShows = async () => {
	state.status = 'pending'

	try {
		const res = await axios.get('http://localhost:5000/api/shows')

		state.status = 'success'
		state.error = null
		state.list = res.data

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postShow = async ({ title, artists, date, venue }) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue }

		const res = await axios.post('http://localhost:5000/api/shows', req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.list = [res.data, ...state.list]

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const editShow = async (showId, { title, artists, date, venue }) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue }

		const res = await axios.patch(
			`http://localhost:5000/api/shows/${showId}`,
			req,
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		const showIndex = state.list.findIndex(
			(show) => show._id === res.data._id
		)

		state.list[showIndex] = res.data

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

export default readonly(state)

export { storeAllShows, postShow, editShow }
