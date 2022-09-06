<script lang="ts" setup>
import type { Section } from "../types";
import IconPlus from "./icons/IconPlus.vue";

defineProps<{
  addTask: (section: Section) => void;
  section: Section;
}>();
</script>

<template>
  <header class="head">
    <h2 :style="{ backgroundColor: `var(--${section.color}-color)` }">
      <input type="text" v-model="section.label" placeholder="Section label" />
    </h2>
    <div class="btn add" @click="addTask(section)">
      <span> Add Task </span>
      <IconPlus />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header.head {
  height: 40px;
  box-shadow: 0 2px 2px rgb(236, 236, 236);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    padding: 3px;
    display: flex;
    border-radius: 4px;

    input {
      padding: 2px 4px;
      background-color: unset;
      font-size: 1rem;
      text-indent: 2px;
      width: 130px;
      outline: none;
      border: none;
    }
  }

  .btn.add {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgb(236, 236, 236);
    padding: 4px;
    border-radius: 4px;
    margin: 0;
    &:hover {
      background-color: rgba(0, 0, 0, 0.089);
    }

    span {
      font-size: 0.8em;
      font-weight: 200;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>