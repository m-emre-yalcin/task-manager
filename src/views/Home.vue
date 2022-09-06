<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";

import Tabs from "../components/tabs.vue";
import Kanban from "../components/kanban.vue";
import Actionsbox from "../components/actionsbox.vue";

const store = useHomeStore();
const { tabs, getActiveTab, actionsbox } = storeToRefs(store);

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

    <!-- for right click actions -->
    <Actionsbox />
  </div>
</template>

<style lang="scss" scoped>
main {
  overflow: auto;
  background-color: var(--kanban-bg-color);
  transition: background-color 0.25s ease;
  height: calc(100vh - 78px);
}
</style>
