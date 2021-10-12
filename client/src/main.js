import { createApp } from 'vue'
const app = createApp(App)

import router from './routes/router'
app.use(router)

// local components
import App from './app/App.vue'
import Navbar from './components/Navbar.vue'
import Nav from './components/Nav.vue'
import FTE from './components/FTE.vue'
import Container from './components/Container.vue'

app.component('Navbar', Navbar)
app.component('Nav', Nav)
app.component('FTE', FTE)
app.component('Container', Container)

app.mount('#app')
