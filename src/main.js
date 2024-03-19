import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'
import i18n from './lang'

const app = createApp(App)

app.use(router)
app.use(VueCookies)
app.use(i18n)
app.mount('#app')
