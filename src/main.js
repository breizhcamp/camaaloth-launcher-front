import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/fontawesome-free-5.4.1/css/all.min.css'
import './assets/main.css'

axios.defaults.baseURL = '/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
