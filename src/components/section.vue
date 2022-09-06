<script lang="ts" setup>
import draggable from "vuedraggable";
import SectionHeader from "./section-header.vue";
import TaskComponent from "./task.vue";
import type { Section, Task } from "../types";

defineProps<{
  index: number;
  section: Section;
  addTask: (section: Section) => void;
  openTask: (task: Task) => void;
  openActions: (payload: any, event: Event) => void;
}>();
</script>


<template>
  <div
    class="section-container"
    @click.right="
      openActions({ type: 'section', item: section, index }, $event)
    "
  >
    <SectionHeader :section="section" :add-task="addTask" />

    <!-- Draggable area -->
    <draggable
      :list="section.tasks"
      :animation="200"
      tag="ul"
      item-key="id"
      class="section"
      group="tasks"
    >
      <!-- Draggable tasks -->
      <template #item="{ element, index }">
        <TaskComponent
          :index="index"
          :task="element"
          :section="section"
          :open-actions="openActions"
          :open-task="openTask"
        />
      </template>
    </draggable>
  </div>
</template>

<style lang="scss">
.section-container {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  border: 1px solid rgb(236, 236, 236);
  margin: 0;
  padding: 0;
  overflow: hidden;

  .section {
    margin-top: 4px;
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    border-radius: 4px;
    height: calc(100vh - 120px - #{2px * 2} - 16px);
    overflow-y: overlay;
    overflow-x: hidden;
  }
}
</style>