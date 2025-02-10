import { createApp } from 'vue'
import './style.css' // Ensure this path is correct
import App from './App.vue'
import router from './router'
import { Toaster } from 'vue-sonner'; // Import Toaster from vue-sonner

createApp(App)
    .use(router)
    .component('Toaster', Toaster)
    .mount('#app')
