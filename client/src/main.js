import { createApp } from 'vue'
import App from './app/App.vue'

const app = createApp(App)

import router from './routes/router'
app.use(router)

// UI components
import Container from './components/ui/Container.vue'
import Card from './components/ui/Card.vue'
import Typography from './components/ui/Typography.vue'
import Button from './components/ui/Button.vue'
import AwesomeIcon from './components/ui/AwesomeIcon.vue'
import Alert from './components/ui/Alert.vue'

app.component('Container', Container)
app.component('Card', Card)
app.component('Typography', Typography)
app.component('Button', Button)
app.component('AwesomeIcon', AwesomeIcon)
app.component('Alert', Alert)

// form components
import Form from './components/ui/forms/Form.vue'
import FormGroup from './components/ui/forms/FormGroup.vue'
import FormControl from './components/ui/forms/FormControl.vue'

app.component('Form', Form)
app.component('FormGroup', FormGroup)
app.component('FormControl', FormControl)

app.mount('#app')
