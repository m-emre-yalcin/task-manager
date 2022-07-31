import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia()

// Set plugins

// - pinia plugins:
pinia.use(piniaPersist)

// - app plugins:
app.use(pinia);
app.use(router);


//
app.mount("#app");
