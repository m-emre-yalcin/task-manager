import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Task from "../views/Task.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/task/:id",
      name: "task",
      component: Task,
    },
  ],
});

export default router;
