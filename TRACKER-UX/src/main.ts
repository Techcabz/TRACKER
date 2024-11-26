import { createApp, markRaw } from 'vue';
import './assets/index.css';
import './assets/dropzone.css';
import { createPinia } from 'pinia';
import App from './App.vue';

import router from './router/index';


const pinia = createPinia();
const app = createApp(App);


pinia.use(({ store}) => {
  store.router = markRaw(router); 
});


app.use(router);  
app.use(pinia);   

app.mount('#app');  
