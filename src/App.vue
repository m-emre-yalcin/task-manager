<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import colors from "@/assets/colors";
import TitleBar from "./components/title-bar.vue";

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