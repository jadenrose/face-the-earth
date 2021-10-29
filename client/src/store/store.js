import { reactive, readonly } from '@vue/reactivity'

import user from './user'
import ui from './ui'
import articles from './articles'
import shows from './shows'

const state = reactive({
    articles: {
        status: null,
        errors: [],
        list: [],
    },
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
    state: readonly(state),
}
