import axios from 'axios'

import store from './store'

const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

export const postImages = async (files) => {
	try {
		const fd = new FormData()

		for (const file of files) fd.append('image', file, file.name)

		const images = await axios.post(`${BASE_URL}/api/images`, fd, {
			headers: {
				'x-auth-token': store.user.token,
			},
		})

		return images.data
	} catch (err) {
		console.error(err)
	}
}
