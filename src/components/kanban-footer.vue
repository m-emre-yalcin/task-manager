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
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  margin: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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