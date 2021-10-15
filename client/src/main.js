import { createApp } from 'vue'
const app = createApp(App)

import router from './routes/router'
app.use(router)

// local components
import App from './app/App.vue'
import Navbar from './components/Navbar.vue'
import Nav from './components/Nav.vue'
import Navlist from './components/Navlist.vue'
import FTE from './components/FTE.vue'
import HeroLogo from './components/HeroLogo.vue'
import Container from './components/Container.vue'
import Typography from './components/Typography.vue'
import Button from './components/Button.vue'

app.component('Navbar', Navbar)
app.component('Nav', Nav)
app.component('Navlist', Navlist)
app.component('FTE', FTE)
app.component('HeroLogo', HeroLogo)
app.component('Container', Container)
app.component('Typography', Typography)
app.component('Button', Button)

app.mount('#app')
