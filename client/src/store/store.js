import { reactive, readonly } from '@vue/reactivity'

import user from './user'
import ui from './ui'
import articles from './articles'
import shows from './shows'
import images from './images'
import artists from './artists'
import venues from './venues'
import videos from './videos'

const state = reactive({
	user,
	ui,
	articles,
	shows,
	images,
	artists,
	venues,
	videos,
})

export default readonly({
	...state,
})
