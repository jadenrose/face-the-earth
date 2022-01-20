import axios from 'axios'
import { reactive, readonly } from 'vue'

import store from './store'

const BASE_URL = process.env.BACKEND_URI || 'http://localhost:5000'

const initialState = {
	status: null,
	error: null,
	list: [],
	sorted: false,
}

const state = reactive(initialState)

const sortStoredArticles = () => {
	state.list.sort((a, b) =>
		a.displayPosition < b.displayPosition
			? -1
			: a.displayPosition > b.displayPosition
			? 1
			: 0
	)

	state.sorted = true
}

const storeAllArticles = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/api/articles`)

		state.status = 'success'
		state.error = null
		state.list = res.data

		sortStoredArticles()
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

const postArticle = async ({ title, body, linkLabel, linkURL }) => {
	const token = store.user.token

	if (!token)
		return {
			article: {},
			error: 'not authorized',
		}

	try {
		let req = { body, displayPosition: 0 }

		if (title) req = { ...req, title }
		if (linkLabel) req = { ...req, linkLabel }
		if (linkURL) req = { ...req, linkURL }

		const res = await axios.post(`${BASE_URL}/api/articles/`, req, {
			headers: {
				'x-auth-token': token,
			},
		})

		state.status = 'success'
		state.error = null
		state.list = [res.data, ...state.list]

		for (const [index, article] of state.list.entries()) {
			state.list.displayPosition = index

			axios.patch(
				`${BASE_URL}/api/articles/${article._id}`,
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
		let req = { body, title }

		if (linkLabel) req = { ...req, linkLabel }
		if (linkURL) req = { ...req, linkURL }

		const res = await axios.patch(
			`${BASE_URL}/api/articles/${articleId}`,
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
		await axios.delete(`${BASE_URL}/api/articles/${articleId}`, {
			headers: {
				'x-auth-token': token,
			},
		})

		const articleIndex = state.list.findIndex(
			(article) => article._id === articleId
		)

		state.list.splice(articleIndex, 1)

		for (const [index, article] of state.list.entries()) {
			state.list.displayPosition = index

			axios.patch(
				`${BASE_URL}/api/articles/${article._id}`,
				{ displayPosition: index },
				{
					headers: {
						'x-auth-token': token,
					},
				}
			)
		}
	} catch (err) {
		return console.error('could not delete article')
	}
}

const moveArticle = (displayPosition, direction) => {
	const token = store.user.token

	const indexToMove = state.list.findIndex(
		(article) => article.displayPosition === displayPosition
	)

	const otherIndex = state.list.findIndex(
		(article) => article.displayPosition === displayPosition + direction
	)

	state.list[indexToMove].displayPosition = displayPosition + direction
	state.list[otherIndex].displayPosition = displayPosition

	try {
		axios.patch(
			`${BASE_URL}/api/articles/${state.list[indexToMove]._id}`,
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
			`${BASE_URL}/api/articles/${state.list[otherIndex]._id}`,
			{
				displayPosition,
			},
			{
				headers: {
					'x-auth-token': token,
				},
			}
		)

		sortStoredArticles()
	} catch (err) {
		state.status = 'failed'
		state.error = err
	}
}

export default readonly(state)

export {
	storeAllArticles,
	postArticle,
	editArticle,
	removeArticle,
	moveArticle,
}
