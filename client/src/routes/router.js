import { createRouter, createWebHistory } from 'vue-router'

// import Route from './Route.vue'
import Editable from './Editable.vue'

import Home from '../pages/Home'
import Shows from '../pages/Shows'
import Contact from '../pages/Contact'
import Watch from '../pages/Watch'
import Login from '../pages/Login'

const publicRoutes = [
	// public routes
	{
		path: '/',
		name: 'Home',
		component: Home,
		editable: true,
	},
	{
		path: '/shows',
		name: 'Shows',
		component: Shows,
		editable: true,
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact,
		editable: false,
	},
	{
		path: '/watch',
		name: 'Watch',
		component: Watch,
		editable: true,
	},
]

publicRoutes.push({
	path: '/adminLogin',
	alias: publicRoutes.map((route) =>
		route.path === '/' ? '/login' : `${route.path}/login`
	),
	name: 'Login',
	component: Login,
	editable: false,
})

const routes = publicRoutes.map((route) => {
	const { component: Component, editable } = route

	const Template = () => {
		if (editable) {
			return (
				<Editable>
					<Component />
				</Editable>
			)
		}

		return <Component />
	}

	return {
		...route,
		component: Template(),
	}
})

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
