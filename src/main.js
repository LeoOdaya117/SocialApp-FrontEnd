import { createApp } from 'vue'
import './style.css' // Ensure this path is correct
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
