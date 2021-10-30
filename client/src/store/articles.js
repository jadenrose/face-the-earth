import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllArticles = async () => {
	try {
		const res = await axios.get('http://localhost:5000/api/articles')

		state.status = 'success'
		state.error = null
		state.list = res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postArticle = async ({
	title,
	body,
	linkLabel,
	linkURL,
	displayPosition,
}) => {
	const token = store.user.token

	if (!token)
		return {
			article: {},
			error: 'not authorized',
		}

	try {
		let req = { body, displayPosition }

		if (title) req = { ...req, title }
		if (linkLabel) req = { ...req, linkLabel }
		if (linkURL) req = { ...req, linkURL }

		const res = await axios.post(
			'http://localhost:5000/api/articles/',
			req,
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		state.status = 'success'
		state.error = null
		state.list = [...state.list, res.data]
	} catch (err) {
		state.status = 'failed'
		state.error = err
	}
}

const editArticle = async (articleId, { title, body, linkLabel, linkURL }) => {
	const token = store.user.token

	if (!token)
		return {
			article: {},
			error: 'not authorized',
		}

	try {
		let req = { body }

		if (title) req = { ...req, title }
		if (linkLabel) req = { ...req, linkLabel }
		if (linkURL) req = { ...req, linkURL }

		const res = await axios.patch(
			`http://localhost:5000/api/articles/${articleId}`,
			req,
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		const newArticle = res.data

		const articleIndex = state.list.findIndex(
			(article) => article._id === newArticle._id
		)

		state.list[articleIndex] = newArticle
	} catch (err) {
		state.status = 'failed'
		state.error = err
	}
}

const removeArticle = async (articleId) => {
	const token = store.user.token

	if (!token)
		return {
			article: {},
			error: 'not authorized',
		}

	try {
		await axios.delete(`http://localhost:5000/api/articles/${articleId}`, {
			headers: {
				'x-auth-token': token,
			},
		})

		const articleIndex = state.list.findIndex(
			(article) => article._id === articleId
		)

		state.list.splice(articleIndex, 1)
	} catch (err) {
		return console.error('could not delete article')
	}
}

export default readonly(state)

export { storeAllArticles, postArticle, editArticle, removeArticle }
