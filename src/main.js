import './assets/main.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import axios from 'axios';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
