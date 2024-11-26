import { createApp, markRaw } from 'vue';
import './style.css';
import './assets/dropzone.css';
import { createPinia } from 'pinia';
import App from './App.vue';

import router from './router/index';


const pinia = createPinia();
const app = createApp(App);

// Pinia setup to inject the router into the store
pinia.use(({ store}) => {
  store.router = markRaw(router); // Ensuring Vue Router is not made reactive
});


app.use(router);  // Make sure the app uses the router
app.use(pinia);   // Use Pinia for state management

app.mount('#app');  // Mount the Vue app
