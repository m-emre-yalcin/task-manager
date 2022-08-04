<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import colors from "@/assets/colors";
import TitleBar from "./components/title-bar.vue";

const router = useRouter();
const barItems = ref([
  {
    name: "Projects",
    href: "/",
  },
  {
    name: "Settings",
    href: "/settings",
  },
]);

const colorToCssVar = (colors: any) => {
  let cssVariables = "";

  for (const color in colors) {
    cssVariables = cssVariables.concat(`--${color}-color: ${colors[color]};`);
  }

  return `:root {${cssVariables}}`;
};

onBeforeMount(() => {
  const css = document.createElement("style");
  css.innerText = colorToCssVar(colors);
  document.head.appendChild(css);
});
</script>

<template>
  <TitleBar
    :items="$route.name !== 'task' ? barItems : []"
    title="Task manager"
  />
  <RouterView />
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
.list-enter-from,
.list-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.complete-enter-active,
.complete-leave-active {
  transition: transform 0.1s ease;
}
.complete-enter-from,
.complete-leave-to {
  transform: scale(1.1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}
</style>