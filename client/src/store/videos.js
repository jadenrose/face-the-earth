import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
	musicVideos: [],
	livePerformances: [],
	lyricVideos: [],
	otherVideos: [],
}

const state = reactive(initialState)

const sortStoredVideos = () => {
	state.list.sort((a, b) =>
		a.displayPosition < b.displayPosition
			? -1
			: a.displayPosition > b.displayPosition
			? 1
			: 0
	)

	state.list.forEach((video) => {
		if (video.category === 'musicVideos') state.musicVideos.push(video)
		else if (video.category === 'livePerformances')
			state.livePerformances.push(video)
		else if (video.category === 'lyricVideos') state.lyricVideos.push(video)
		else state.otherVideos.push(video)
	})

	state.musicVideos = state.list.filter(
		(video) => video.category === 'musicVideos'
	)
	state.livePerformances = state.list.filter(
		(video) => video.category === 'livePerformances'
	)
	state.lyricVideos = state.list.filter(
		(video) => video.category === 'lyricVideos'
	)
}

const storeAllVideos = async () => {
	state.status = 'pending'

	try {
		const res = await axios.get(`${BASE_URL}/api/videos`)

		state.status = 'success'
		state.error = null
		state.list = res.data

		sortStoredVideos()
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postVideo = async ({ title, desc, url, category }) => {
	const token = store.user.token

	if (!token)
		return {
			show: {},
			error: 'not authorized',
		}

	try {
		const req = {
			title,
			desc,
			url,
			category,
			displayPosition: 0,
		}

		const res = await axios.post(`${BASE_URL}/api/videos`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.list = [res.data, ...state.list]

		for (const [index, video] of state.list.entries()) {
			state.list.displayPosition = index

			axios.patch(
				`${BASE_URL}/api/videos/${video._id}`,
				{ displayPosition: index },
				{
					headers: {
						'x-auth-token': token,
					},
				}
			)
		}
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const editVideo = async (videoId, { title, desc, url, category }) => {
	const token = store.user.token

	if (!token)
		return {
			show: {},
			error: 'not authorized',
		}

	try {
		const req = {
			title,
			desc,
			url,
			category,
		}

		const res = await axios.patch(
			`${BASE_URL}/api/videos/${videoId}`,
			req,
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		const videoIndex = state.list.findIndex(
			(video) => video._id === res.data._id
		)

		state.list[videoIndex] = res.data

		return res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err

		return null
	}
}

const removeVideo = async (videoId) => {
	const token = store.user.token

	if (!token)
		return {
			video: {},
			error: 'not authorized',
		}

	try {
		await axios.delete(`${BASE_URL}/api/videos/${videoId}`, {
			headers: {
				'x-auth-token': token,
			},
		})

		const videoIndex = state.list.findIndex(
			(video) => video._id === videoId
		)

		state.list.splice(videoIndex, 1)

		for (const [index, video] of state.list.entries()) {
			state.list.displayPosition = index

			axios.patch(
				`${BASE_URL}/api/videos/${video._id}`,
				{ displayPosition: index },
				{
					headers: {
						'x-auth-token': token,
					},
				}
			)
		}
	} catch (err) {
		return console.error('could not delete video')
	}
}

const moveVideo = (displayPosition, direction) => {
	const token = store.user.token

	const indexToMove = state.list.findIndex(
		(video) => video.displayPosition === displayPosition
	)

	const otherIndex = state.list.findIndex(
		(video) => video.displayPosition === displayPosition + direction
	)

	state.list[indexToMove].displayPosition = displayPosition + direction
	state.list[otherIndex].displayPosition = displayPosition

	try {
		axios.patch(
			`${BASE_URL}/api/videos/${state.list[indexToMove]._id}`,
			{
				displayPosition: displayPosition + direction,
			},
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		axios.patch(
			`${BASE_URL}/api/videos/${state.list[otherIndex]._id}`,
			{
				displayPosition,
			},
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		sortStoredVideos()
	} catch (err) {
		state.status = 'failed'
		state.error = err
	}
}

export default readonly(state)

export { storeAllVideos, editVideo, postVideo, removeVideo, moveVideo }
