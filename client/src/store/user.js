import axios from 'axios'
import { reactive, readonly } from 'vue'

import { setMode } from './ui'

const initialState = {
    status: null,
    error: null,
    token: null,
}

const state = reactive(initialState)

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

        state.status = 'success'
        state.error = null
        state.token = token

        localStorage.setItem('user', token)

        setMode('readonly')
    } catch (err) {
        state.status = 'failed'
        state.error = err
        state.token = null
    }
}

const logout = () => {
    state.status = null
    state.error = null
    state.token = null

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

        state.status = 'success'
        state.error = null
        state.token = token

        setMode('readonly')
    } catch (err) {
        state.status = null
        state.errors = null
        state.token = null

        localStorage.removeItem('user')
    }
}

export default readonly(state)

export { login, logout, refreshToken }
