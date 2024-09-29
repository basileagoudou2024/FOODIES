
/// <reference types="vue" />

import './assets/base.css'
import { createApp } from 'vue'
import App from "./App.vue";
import i18n from '../src/i-18n/i18n';
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';



const app = createApp(App)
app.use(i18n);                // Utilisez i18n comme plugin
app.use(createPinia())
app.mount('#app')





