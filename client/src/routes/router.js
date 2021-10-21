import { createRouter, createWebHistory } from 'vue-router'

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

    // login page
    {
        path: '/login',
        name: 'Login',
        component: Login,
        editable: false,
    },
]

const routes = publicRoutes.map((route) => {
    const { path, name, component: Component, editable } = route

    if (editable)
        return {
            path,
            name,
            components: {
                default: Component,
                admin: Component,
            },
            props: {
                admin: { mode: 'view' },
            },
        }

    return route
})

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
