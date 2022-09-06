<script lang="ts" setup>
import type { Project } from "../types";
import IconPlus from "./icons/IconPlus.vue";

defineProps<{
  addSection: (project: Project) => void;
  project: Project;
}>();
</script>

<template>
  <div class="btn add" @click="addSection(project)">
    <span> Add Section </span>
    <IconPlus />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 2px dashed rgba(75, 11, 49, 0.156);
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.313);
  &:hover {
    background-color: rgba(255, 255, 255, 0.521);
    border: 2px dashed rgba(75, 11, 49, 0.532);
  }

  span {
    font-size: 1em;
    font-weight: 200;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}
</style>