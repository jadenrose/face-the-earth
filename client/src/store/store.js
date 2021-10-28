import { reactive, readonly } from '@vue/reactivity'
import axios from 'axios'

const PENDING = 'pending'
const SUCCESS = 'success'
const FAILED = 'failed'

const READONLY = 'readonly'
const EDIT = 'edit'
const ADD = 'add'
const REMOVE = 'remove'
const MOVE = 'move'

const state = reactive({
    shows: {
        status: null,
        errors: [],
        list: [],
    },
    videos: {
        status: null,
        errors: [],
        list: [],
    },
    user: {
        status: null,
        error: null,
        token: null,
    },
    ui: {
        mode: null,
    },
})

const storeAllShows = async () => {
    state.shows.status = PENDING

    try {
        const res = await axios.get('http://localhost:5000/api/shows')

        state.shows = {
            ...state.shows,
            status: SUCCESS,
            error: null,
            list: res.data,
        }

        return res.data
    } catch (err) {
        state.shows = {
            ...state.shows,
            status: FAILED,
            error: err,
            list: [],
        }
    }
}

const login = async (email, password) => {
    try {
        const res = await axios.get('http://localhost:5000/api/auth', {
            headers: {
                email,
                password,
            },
        })

        const token = res.data

        if (!token) throw 'login failed'

        state.user = {
            status: SUCCESS,
            error: null,
            token,
        }

        localStorage.setItem('user', token)

        setMode(READONLY)
    } catch (err) {
        state.user = {
            status: FAILED,
            error: err,
            token: null,
        }
    }
}

const logout = () => {
    state.user = {
        status: null,
        error: null,
        token: null,
    }

    localStorage.removeItem('user')
}

const refreshToken = async () => {
    try {
        const storedToken = localStorage.getItem('user')

        if (!storedToken) throw 'no token'

        const res = await axios.get('http://localhost:5000/api/auth/token', {
            headers: {
                'x-auth-token': storedToken,
            },
        })

        const token = res.data

        state.user = {
            status: SUCCESS,
            errors: null,
            token,
        }

        setMode(state.ui.mode || READONLY)
    } catch (err) {
        state.user = {
            status: null,
            errors: null,
            token: null,
        }
    }
}

const setMode = (mode = READONLY) => {
    switch (mode) {
        case READONLY: {
            state.ui.mode = READONLY
            break
        }
        case EDIT: {
            state.ui.mode = EDIT
            break
        }
        case ADD: {
            state.ui.mode = ADD
            break
        }
        case REMOVE: {
            state.ui.mode = REMOVE
            break
        }
        case MOVE: {
            state.ui.mode = MOVE
            break
        }
        default: {
            state.ui.mode = READONLY
            break
        }
    }
}

const postArticle = async (articleHeader, articleBody) => {
    const token = state.user.token

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

        console.log(res.data)

        return {
            article: res.data,
            error: '',
        }
    } catch (err) {
        return {
            article: {},
            error: err,
        }
    }
}

export default {
    state: readonly(state),
    storeAllShows,
    login,
    logout,
    refreshToken,
    setMode,
    postArticle,
}
