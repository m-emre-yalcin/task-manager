<script setup lang="ts">
import IconClose from "./icons/IconClose.vue";
import type { Project } from "../types";

defineProps<{
  tab: Project;
  index: number;
  switchTab: (index: number) => void;
  removeTab: (index: number) => void;
  openActions: (payload: any, event: any) => void;
  theme?: string;
}>();
</script>

<template>
  <div
    :draggable="!tab.pinned"
    :class="{
      tab: true,
      pinned: tab.pinned,
      active: tab.activated,
    }"
    :style="
      tab.activated && {
        background: theme,
      }
    "
    @click="switchTab(index)"
    @click.right="openActions({ project: tab }, $event)"
  >
    <div class="left">
      <span class="text">{{ tab.title }}</span>
    </div>
    <div class="right" v-show="tab.pinned === false" @click="removeTab(index)">
      <span class="btn close">
        <IconClose />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px;
  user-select: none;
  background-color: rgb(82, 39, 74);
  color: #eee;
  svg {
    fill: white;
  }

  &.pinned {
    width: 40px;
    .right {
      display: none;
    }
  }
  &.active {
    background-color: white;
    color: #111;
    svg {
      fill: #111;
    }
  }
  &:not(.active) {
    cursor: pointer;

    &:hover {
      background-color: rgb(116, 64, 111);
      color: white;
      svg {
        fill: white;
      }
    }
  }

  .left {
    display: flex;
    justify-self: flex-start;
    align-items: center;

    .text {
      font-weight: 200;
    }
  }

  .right {
    display: flex;
    justify-self: flex-end;
    align-items: center;
    height: 100%;
    cursor: pointer;

    &:hover {
      .btn.close {
        background-color: rgb(255, 55, 55);
        svg {
          fill: white;
        }
      }
    }
    .btn.close {
      display: flex;
      padding: 2px;
      border-radius: 50%;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>