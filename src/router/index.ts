import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";
import Task from "../views/Task.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/task/:id",
      name: "task",
      component: Task,
    },
  ],
});

export default router;
