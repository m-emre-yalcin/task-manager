import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'

import App from "./App.vue";
import router from "./router";
import { useRoute } from 'vue-router'


import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia()


// Set plugins

// - pinia plugins:
pinia.use(piniaPersist)
pinia.use(({ store }) => {
  // pinia globals:
  const route = useRoute()
  store.$route = markRaw(route)
})

// - app plugins:
app.use(pinia);
app.use(router);


//
app.mount("#app");
