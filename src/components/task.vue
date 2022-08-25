<script setup lang="ts">
import IconDone from "../components/icons/IconDone.vue";
import type { Task, SubTask, Section } from "../types";

defineProps<{
  index: number;
  task: Task;
  section: Section;
  openTask: (task: Task) => void;
  openActions: (payload: any, event: any) => any;
}>();

const completeRatio = (list: Array<SubTask>) => {
  return (
    (list && list.filter((item) => item.completed).length / list.length) * 100 +
    "%"
  );
};
const limitText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, 100) + "...";
  }
  return text;
};
</script>

<template>
  <li
    class="task"
    :style="{
      'border-color': `var(--${section.color}-color)`,
    }"
    @click="openTask(task)"
    @click.right="
      openActions({ type: 'task', item: task, section, index }, $event)
    "
  >
    <div class="start">
      <h3 class="title" :title="task.title">
        {{ limitText(task.title, 40) }}
      </h3>
      <p class="description" :title="task.description">
        {{ limitText(task.description, 100) }}
      </p>
    </div>

    <span class="end" :class="{ done: task.completed }">
      <IconDone v-show="task.completed" />
    </span>

    <div class="progress-bg" :style="{ width: completeRatio(task.list) }"></div>
  </li>
</template>

<style lang="scss">
.task {
  border: 1px solid rgb(236, 236, 236);
  border-left: 4px solid rgb(236, 236, 236);
  cursor: pointer;
  border-radius: 4px;
  padding: 4px 6px;
  display: flex;
  justify-content: space-between;
  position: relative;

  &:hover {
    background-color: rgb(253, 248, 255);
  }

  .start {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .description {
      font-weight: 300;
      font-size: 12px;
      opacity: 0.8;
    }
  }
  .end {
    display: flex;
    align-items: flex-start;
    padding: 2px;
    &.done {
      svg,
      svg path {
        fill: rgb(142, 231, 149);
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .progress-bg {
    height: 100%;
    transition: width 0.25s ease;
    background-image: linear-gradient(
      to right,
      rgba(77, 215, 77, 0.188),
      rgba(38, 158, 38, 0.113),
      rgba(127, 197, 206, 0.201)
    );
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>