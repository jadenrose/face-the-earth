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
import FancyButton from './components/ui/FancyButton.vue'
import AddButton from './components/ui/AddButton.vue'
import SaveButton from './components/ui/SaveButton.vue'
import CancelButton from './components/ui/CancelButton.vue'
import SaveCancel from './components/ui/SaveCancel.vue'
import CloseButton from './components/ui/CloseButton.vue'
import AwesomeIcon from './components/ui/AwesomeIcon.vue'
import Alert from './components/ui/Alert.vue'
import AdminTools from './components/AdminTools.vue'

app.component('Container', Container)
app.component('Card', Card)
app.component('Typography', Typography)
app.component('Button', Button)
app.component('FancyButton', FancyButton)
app.component('AddButton', AddButton)
app.component('SaveButton', SaveButton)
app.component('CancelButton', CancelButton)
app.component('SaveCancel', SaveCancel)
app.component('CloseButton', CloseButton)
app.component('AwesomeIcon', AwesomeIcon)
app.component('Alert', Alert)
app.component('AdminTools', AdminTools)

// form components
import Form from './components/forms/Form.vue'
import FormSection from './components/forms/FormSection.vue'
import FormGroup from './components/forms/FormGroup.vue'
import FormControl from './components/forms/FormControl.vue'

app.component('Form', Form)
app.component('FormSection', FormSection)
app.component('FormGroup', FormGroup)
app.component('FormControl', FormControl)

app.mount('#app')
