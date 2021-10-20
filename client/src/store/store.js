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
        const token = await axios.get('http://localhost:5000/api/auth', {
            body: {
                email,
                password,
            },
        })

        if (!token) throw 'login failed'

        return token
    } catch (err) {
        state.user = {
            status: FAILED,
            errors: [...state.user.errors, err],
            token: null,
        }
    }
}

export default {
    state: readonly(state),
    storeAllShows,
    login,
}
