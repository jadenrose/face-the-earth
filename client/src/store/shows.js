import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const BASE_URL = process.env.BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllShows = async () => {
	state.status = 'pending'

	try {
		const res = await axios.get(`${BASE_URL}/api/shows`)

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

const postShow = async ({ title, artists, date, venue, images }) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue, images }

		const res = await axios.post(`${BASE_URL}/api/shows`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.list = [...state.list, res.data]

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const editShow = async (showId, { title, artists, date, venue, images }) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue, images }

		const res = await axios.patch(`${BASE_URL}/api/shows/${showId}`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

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

const removeShow = async (showId) => {
	const token = store.user.token

	if (!token)
		return {
			show: {},
			error: 'not authorized',
		}

	try {
		await axios.delete(`${BASE_URL}/api/shows/${showId}`, {
			headers: {
				'x-auth-token': token,
			},
		})

		const showIndex = state.list.findIndex((show) => show._id === showId)

		state.list.splice(showIndex, 1)
	} catch (err) {
		return console.error('could not delete article')
	}
}

export default readonly(state)

export { storeAllShows, postShow, editShow, removeShow }
