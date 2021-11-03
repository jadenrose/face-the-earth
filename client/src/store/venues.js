import axios from 'axios'
import { reactive, readonly } from 'vue'

const initialState = {
	status: null,
	error: null,
	list: [],
}

const state = reactive(initialState)

const storeAllVenues = async () => {
	try {
		const res = await axios.get('http://localhost:5000/api/venues')

		state.status = 'success'
		state.error = null
		state.list = res.data
	} catch (err) {
		state.status = 'failed'
		state.error = err
		state.list = []
	}
}

export default readonly(state)

export { storeAllVenues }
