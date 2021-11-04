import { reactive, readonly } from '@vue/reactivity'

import user from './user'
import ui from './ui'
import articles from './articles'
import shows from './shows'
import artists from './artists'
import venues from './venues'
import videos from './videos'

const state = reactive({
	videos: {
		status: null,
		errors: [],
		list: [],
	},
	ui: {
		mode: null,
	},
})

export default {
	user,
	ui,
	articles,
	shows,
	artists,
	venues,
	videos,
	state: readonly(state),
}
