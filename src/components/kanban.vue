<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";

import draggable from "vuedraggable";
import Section from "./section.vue";
import Welcome from "./welcome.vue";
import KanbanFooter from "./kanban-footer.vue";

const store = useHomeStore();
const { getActiveTab } = storeToRefs(store);
</script>

<template>
  <!-- Render the kanban board -->
  <template v-if="getActiveTab">
    <!-- Draggable area -->
    <draggable
      :list="getActiveTab?.sections"
      :animation="200"
      item-key="id"
      class="kanban"
      group="sections"
      handle=".section-container"
    >
      <!-- Draggable sections -->
      <template #item="{ element, index }">
        <Section
          :index="index"
          :section="element"
          :add-task="store.addTask"
          :open-task="store.openTask"
          :open-actions="store.openActions"
        />
      </template>

      <!-- Kanban End -->
      <template #footer>
        <KanbanFooter :add-section="store.addSection" :project="getActiveTab" />
      </template>
    </draggable>
  </template>

  <!-- Fallback to welcome screen -->
  <Welcome v-else />
</template>


<style lang="scss" scoped>
.kanban {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 270px;
  box-sizing: border-box;
  width: fit-content;
  gap: 8px;
  padding: 8px;
  height: 100%;
}
</style>