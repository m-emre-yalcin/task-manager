<script lang="ts" setup>
import { ref } from "vue";
import { useHomeStore } from "../stores/home";
import { storeToRefs } from "pinia";
import colors from "../assets/colors.json";
import IconDone from "./icons/IconDone.vue";
import IconTrash from "./icons/IconTrash.vue";

import type { ActionsBox, Project } from "@/types";

const store = useHomeStore();
const { actionsbox } = storeToRefs(store);

const getThemes = (prefix: "p-" | "s-" | "t-") => {
  return Object.keys(colors)
    .filter((key) => key.startsWith(prefix))
    .map((key) => {
      return { key, color: colors[key] };
    });
};

const datalist = ref({
  project: [
    {
      name: "Rename",
      key: "title",
    },
    {
      name: "Theme",
      colors: getThemes("p-"),
    },
    {
      name: "Delete",
      fn: () => {
        store.removeTab(actionsbox.value?.data.index);
      },
      icon: IconTrash,
    },
  ],
  section: [
    {
      name: "Rename",
      key: "label",
    },
    {
      name: "Color",
      colors: getThemes("s-"),
    },
    {
      name: "Delete",
      icon: IconTrash,
    },
  ],
  task: [
    {
      name: "Rename",
      key: "title",
    },
    {
      name: "Delete",
      icon: IconTrash,
    },
  ],
});

// Workaround code for now
const executeItemAction = (item: any, type: any) => {
  if (item.name === "Delete") {
    if (type === "project") {
      store.removeTab(actionsbox.value?.data.index);
    }
    if (type === "section") {
      store.removeSection(actionsbox.value?.data.index);
    }
    if (type === "task") {
      store.removeTask(
        actionsbox.value?.data.section,
        actionsbox.value?.data.index
      );
    }

    store.closeActions();
  }
};
</script>

<template>
  <div
    class="overlay"
    @click="store.closeActions"
    @click.right.stop.prevent
    v-if="Object.keys(actionsbox).length"
  >
    <div
      @click.stop
      class="box"
      :style="{
        transform: `translate(${actionsbox.event.x}px, ${actionsbox.event.y}px)`,
      }"
    >
      <ul>
        <li
          v-for="item in datalist[actionsbox.data.type]"
          :key="item.name"
          @click="executeItemAction(item, actionsbox.data.type)"
        >
          <template v-if="item.key">
            <input type="text" v-model="actionsbox.data.item[item.key]" />
          </template>

          <template v-else-if="item.colors">
            <ul class="colors">
              <li
                v-for="{ key, color } in item.colors"
                :key="color"
                :title="'pick ' + color"
                :style="{ backgroundColor: color }"
                :class="{ active: key === actionsbox.data.item.color }"
                @click="actionsbox.data.item.color = key"
              />
            </ul>
          </template>

          <template v-else>
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);

  .box {
    background-color: white;
    position: absolute;
    border-radius: 6px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);

    ul {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        align-items: center;
        padding: 8px 4px;
        background-color: rgb(255, 255, 255);
        cursor: pointer;

        &:first-child {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        &:last-child {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        &:hover {
          background-color: var(--primary-color);
          color: white;
          svg {
            fill: white;
          }

          input {
            color: white;
          }
        }
        &:active {
          background-color: rgb(72, 7, 63);
        }

        > span {
          user-select: none;
          text-indent: 34px;
          font-size: 0.9rem;
        }
        > svg {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          position: absolute;
        }
        input {
          background-color: unset;
          padding: 6px;
          outline: unset;
          border: 1px solid;
          border-radius: 6px solid;
          font-size: 0.9rem;
          border-color: rgb(212, 212, 212);
        }
        .colors {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          flex: 1;
          padding: 4px 0;
          gap: 4px;
          li {
            width: 20px;
            height: 20px;
            transition: transform 0.25s ease-out, opacity 0.2s;
            border-radius: 50%;
            background-color: white;
            border: 2px solid rgb(240, 240, 240);
            cursor: pointer;
            &:not(.active) {
              opacity: 0.5;
            }

            &:hover {
              transform: scale(1.1);
              opacity: 1;
            }
            &.active,
            &:focus,
            &:active {
              transform: scale(1.25);
            }
          }
        }
      }
      hr {
        height: 0px;
        background-color: unset;
        margin: 4px;
        border: unset;
        border-bottom: 1px solid rgb(230, 229, 229);
      }
    }
  }
}
</style>
