// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i-18n/i18n'; // Assurez-vous que ce chemin est correct
import { createPinia } from 'pinia';
import './assets/base.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(i18n); // Utilisez i18n comme plugin
app.use(createPinia());
app.mount('#app');
