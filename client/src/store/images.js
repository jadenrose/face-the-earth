import axios from 'axios'
import { readonly, reactive } from '@vue/reactivity'

import store from './store'

const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

export const storeAllImages = async () => {
	try {
		const { data: images } = await axios.get(`${BASE_URL}/api/images`, {
			headers: {
				'x-auth-token': store.user.token,
			},
		})

		state.list = images.map((image) => image._id)

		return null
	} catch (err) {
		console.error(err)
		return err
	}
}

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

export const deleteImage = async (imageId) => {
	try {
		await axios.delete(`${BASE_URL}/api/images/${imageId}`, {
			headers: {
				'x-auth-token': store.user.token,
			},
		})

		return null
	} catch (err) {
		console.error(err)
		return err
	}
}

export default readonly(state)
