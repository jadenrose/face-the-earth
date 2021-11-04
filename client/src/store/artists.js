import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllArtists = async () => {
	try {
		const res = await axios.get('http://localhost:5000/api/artists')

		state.status = 'success'
		state.error = null
		state.list = res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postArtist = async ({ name, link }) => {
	try {
		const token = store.user.token
		if (!token) throw 'not authorized'

		let req = { name }
		if (link) req = { ...req, link }

		const res = await axios.post('http://localhost:5000/api/artists', req, {
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

export default readonly(state)

export { storeAllArtists, postArtist }
