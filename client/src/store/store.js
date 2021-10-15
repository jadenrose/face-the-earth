import { reactive } from '@vue/reactivity'
import axios from 'axios'

const PENDING = 'pending'
const SUCCESS = 'success'
const FAILED = 'failed'

const store = {
    state: reactive({
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
        user: {},
    }),

    storeAllShows: async function() {
        this.state.shows.status = PENDING

        try {
            const res = await axios.get('http://localhost:5000/api/shows')

            this.state.shows = {
                ...this.state.shows,
                status: SUCCESS,
                errors: [],
                list: res.data,
            }
        } catch (err) {
            this.state.shows = {
                ...this.state.shows,
                status: FAILED,
                errors: [...this.state.shows.errors, err],
                list: [],
            }
        }
    },
}

export default {
    state: store.state,
    storeAllShows: store.storeAllShows,
}
