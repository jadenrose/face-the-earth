import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home'
import Shows from '../pages/Shows'
import Contact from '../pages/Contact'
import Watch from '../pages/Watch'
import Login from '../pages/Login'
import Success from '../pages/Success'
import Terms from '../pages/Terms'
import Privacy from '../pages/Privacy'

const routes = [
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
	{
		path: '/terms',
		name: 'Terms',
		component: Terms,
		editable: false,
	},
	{
		path: '/privacy',
		name: 'Privacy',
		component: Privacy,
		editable: false,
	},
]

routes.push({
	path: '/adminLogin',
	alias: routes.map((route) =>
		route.path === '/' ? '/login' : `${route.path}/login`
	),
	name: 'Login',
	component: Login,
	editable: false,
})

routes.push({
	path: '/success',
	name: 'Success',
	component: Success,
	editable: false,
})

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 }
	},
})

export default router
