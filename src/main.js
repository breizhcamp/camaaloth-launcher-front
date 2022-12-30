import socketIo from '@/plugins/socketio'
import {useRecordStateStore} from '@/stores/recordState'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import {createPinia} from 'pinia'
import {createApp} from 'vue'

import App from './App.vue'
import './assets/fontawesome-free-5.4.1/css/all.min.css'
import './assets/main.css'
import router from './router'

axios.defaults.baseURL = '/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(socketIo)

useRecordStateStore().load()

app.mount('#app')