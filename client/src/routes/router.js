import { createRouter, createWebHistory } from 'vue-router'

import { Home, Shows, Contact, Watch } from './index'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/shows', name: 'Shows', component: Shows },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/watch', name: 'Watch', component: Watch },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
