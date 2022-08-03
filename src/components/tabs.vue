<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";
import draggable from "vuedraggable";
import IconPlus from "./icons/IconPlus.vue";
import TabComponent from "./tab.vue";

defineProps<{
  theme: string;
}>();

const store = useHomeStore();
const { tabs } = storeToRefs(store);
</script>

<template>
  <!-- contains all opened projects or settings -->
  <div class="tabs not-draggable">
    <draggable
      :list="tabs"
      :animation="100"
      item-key="id"
      class="wrapper"
      handle=".tab:not(.pinned)"
    >
      <template #item="{ element, index }">
        <TabComponent
          :tab="element"
          :index="index"
          :switch-tab="store.switchTab"
          :remove-tab="store.removeTab"
          :open-actions="store.openActions"
          :theme="theme"
        />
      </template>
    </draggable>

    <div class="btn add-project" @click="store.addTab()">
      <IconPlus />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: grid;
  align-items: flex-end;
  grid-auto-flow: column;
  justify-content: flex-start;
  max-width: calc(100vw - 8px);
  margin-top: 6px;

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    height: 0px;
    width: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: black;
  }

  .wrapper {
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    gap: 1px;
  }
  .btn.add-project {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;
    background-color: rgb(110, 0, 98);
    border-top-right-radius: 4px;
    &:hover {
      background-color: rgb(151, 0, 133);
    }

    svg {
      width: 16px;
      height: 16px;
      fill: rgb(218, 218, 218);
    }
  }
}
</style>