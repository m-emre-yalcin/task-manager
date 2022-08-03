<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";

import Tabs from "../components/tabs.vue";
import Kanban from "../components/kanban.vue";

const store = useHomeStore();
const { getActiveTab } = storeToRefs(store);

const themeColor = computed(() => {
  return `var(--${getActiveTab?.value?.color}-color)`;
});
</script>

<template>
  <div class="task-manager-container">
    <!-- tabs and options -->
    <header class="draggable">
      <Tabs :theme="themeColor" />
    </header>

    <!-- main content -- kanban -->
    <main :style="{ background: themeColor }">
      <Kanban />
    </main>
  </div>
</template>

<style lang="scss" scoped>
main {
  overflow: auto;
  height: calc(100vh - 80px);
  background-color: var(--kanban-bg-color);
  transition: background-color 0.25s ease;
}
</style>
