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

const postArticle = async (articleHeader, articleBody) => {
    const token = store.user.token

    if (!token)
        return {
            article: {},
            error: 'not authorized',
        }

    try {
        const res = await axios.post(
            'http://localhost:5000/api/articles/',
            {
                title: articleHeader,
                body: articleBody,
            },
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

export default readonly(state)

export { storeAllArticles, postArticle }
