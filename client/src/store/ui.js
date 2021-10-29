import { reactive, readonly } from 'vue'

const initialState = {
    mode: null,
}

const state = reactive(initialState)

const setMode = (mode = 'readonly') => {
    switch (mode) {
        case 'readonly': {
            state.mode = 'readonly'
            break
        }
        case 'edit': {
            state.mode = 'edit'
            break
        }
        case 'add': {
            state.mode = 'add'
            break
        }
        case 'remove': {
            state.mode = 'remove'
            break
        }
        case 'move': {
            state.mode = 'move'
            break
        }
        default: {
            state.mode = 'readonly'
            break
        }
    }
}

export default readonly(state)

export { setMode }
