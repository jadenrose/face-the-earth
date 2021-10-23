import { reactive, readonly } from '@vue/reactivity'
import axios from 'axios'

const PENDING = 'pending'
const SUCCESS = 'success'
const FAILED = 'failed'

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
        errors: [],
        token: null,
    },
})

const storeAllShows = async () => {
    state.shows.status = PENDING

    try {
        const res = await axios.get('http://localhost:5000/api/shows')

        state.shows = {
            ...state.shows,
            status: SUCCESS,
            errors: [],
            list: res.data,
        }

        return res.data
    } catch (err) {
        state.shows = {
            ...state.shows,
            status: FAILED,
            errors: [...state.shows.errors, err],
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
            errors: [],
            token,
        }

        localStorage.setItem('user', token)
    } catch (err) {
        state.user = {
            status: FAILED,
            errors: [...state.user.errors, err],
            token: null,
        }
    }
}

const logout = () => {
    state.user = {
        status: null,
        errors: [],
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
            errors: [],
            token,
        }
    } catch (err) {
        state.user = {
            status: null,
            errors: [],
            token: null,
        }
    }
}

export default {
    state: readonly(state),
    storeAllShows,
    login,
    logout,
    refreshToken,
}
