import { reactive, readonly } from 'vue'

const initialState = {
	screenSize: 'small',
	showMobileMenu: false,
}

const state = reactive(initialState)

const setScreenSize = (size) => {
	switch (size) {
		case 'small': {
			state.screenSize = 'small'
			break
		}
		case 'medium': {
			state.screenSize = 'medium'
			break
		}
		case 'large': {
			state.screenSize = 'large'
			break
		}
		default: {
			state.screenSize = 'small'
		}
	}
}

const openMobileMenu = () => {
	state.showMobileMenu = true
}

const closeMobileMenu = () => {
	state.showMobileMenu = false
}

export default readonly(state)

export { setScreenSize, openMobileMenu, closeMobileMenu }
