import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
	upcomingShows: [],
	pastShows: [],
}

const state = reactive(initialState)

const oragnizeShows = () => {
	const today = new Date()

	state.upcomingShows = []
	state.pastShows = []

	state.list.forEach((show) => {
		if (show.dateObj > today) {
			state.upcomingShows.push(show)
		} else if (show.dateObj.toString() === 'Invalid Date') {
			state.upcomingShows.unshift(show)
		} else state.pastShows.unshift(show)
	})
}

export const storeAllShows = async () => {
	state.status = 'pending'

	try {
		const res = await axios.get(`${BASE_URL}/api/shows`)

		state.status = 'success'
		state.error = null

		state.list = res.data
			.sort((a, b) =>
				new Date(a.date) > new Date(b.date)
					? 1
					: new Date(a.date) < new Date(b.date)
					? -1
					: 0
			)
			.map((show) => {
				const dateArr = show.date.split(/[- :]/)

				return {
					...show,
					dateObj: new Date(
						dateArr[0],
						dateArr[1] - 1,
						dateArr[2],
						23,
						59
					),
				}
			})

		oragnizeShows()

		state.status = 'success'

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

export const postShow = async ({
	title,
	artists,
	date,
	venue,
	link,
	images,
}) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue, link, images }

		const res = await axios.post(`${BASE_URL}/api/shows`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.list = [...state.list, res.data]

		storeAllShows()
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

export const editShow = async (
	showId,
	{ title, artists, date, venue, link, images }
) => {
	try {
		const token = store.user.token

		if (!token) throw 'not authorized'

		let req = { title, artists, date, venue, link, images }

		await axios.patch(`${BASE_URL}/api/shows/${showId}`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		storeAllShows()
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

export const removeShow = async (showId) => {
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

		storeAllShows()
	} catch (err) {
		return console.error('could not delete article')
	}
}

export const setSelectedImages = (showId, images) => {
	const index = state.list.findIndex((show) => show._id === showId)

	state.list = [
		...state.list.slice(0, index),
		{ ...state.list[index], images },
		...state.list.slice(index + 1),
	]

	oragnizeShows()
}

export default readonly(state)
