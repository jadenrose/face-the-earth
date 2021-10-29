import axios from 'axios'
import { reactive, readonly } from 'vue'

const initialState = {
    status: null,
    error: null,
    list: [],
}

const state = reactive(initialState)

const storeAllShows = async () => {
    state.status = 'pending'

    try {
        const res = await axios.get('http://localhost:5000/api/shows')

        state.status = 'success'
        state.error = null
        state.list = res.data

        return res.data
    } catch (err) {
        state.status = 'failed'
        state.error = err
        state.list = []
    }
}

export default readonly(state)

export { storeAllShows }
