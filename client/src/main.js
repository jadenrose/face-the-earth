import { createApp } from 'vue'
const app = createApp(App)

import router from './routes/router'
app.use(router)

// UI components
import Container from './components/Container.vue'
import Card from './components/Card.vue'
import Typography from './components/Typography.vue'
import Button from './components/Button.vue'

app.component('Container', Container)
app.component('Card', Card)
app.component('Typography', Typography)
app.component('Button', Button)

// local components
import App from './app/App.vue'
import Navbar from './components/Navbar.vue'
import Nav from './components/Nav.vue'
import Navlist from './components/Navlist.vue'
import AwesomeIcon from './components/AwesomeIcon.vue'
import FTE from './components/FTE.vue'
import HeroLogo from './components/HeroLogo.vue'
import ShowsList from './components/ShowsList.vue'

app.component('Navbar', Navbar)
app.component('Nav', Nav)
app.component('Navlist', Navlist)
app.component('AwesomeIcon', AwesomeIcon)
app.component('FTE', FTE)
app.component('HeroLogo', HeroLogo)
app.component('ShowsList', ShowsList)

app.mount('#app')
