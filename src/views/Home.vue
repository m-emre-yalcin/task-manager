<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";
import draggable from "vuedraggable";

import IconDone from "../components/icons/IconDone.vue";
import IconClose from "../components/icons/IconClose.vue";
import IconPlus from "../components/icons/IconPlus.vue";

const store = useHomeStore();
const { tabs, getActiveTab } = storeToRefs(store);
const dropdown = ref(false);
</script>

<template>
  <div class="task-manager-container">
    <!-- tabs and options -->
    <header class="draggable">
      <!-- contains all opened projects or settings -->
      <div class="tabs not-draggable" style="z-index: 10" @drag.stop.prevent>
        <draggable
          :list="tabs"
          :animation="200"
          item-key="id"
          class="wrapper"
          handle=".tab:not(.pinned)"
        >
          <template #item="{ element, index }">
            <div
              :draggable="!element.pinned"
              :class="{
                tab: true,
                pinned: element.pinned,
                active: element.activated,
              }"
              @click="store.switchTab(index)"
            >
              <div class="left">
                <span class="text">{{ element.title }}</span>
              </div>
              <div
                class="right"
                v-show="element.pinned === false"
                @click="store.removeTab(index)"
              >
                <span class="btn close">
                  <IconClose />
                </span>
              </div>
            </div>
          </template>
        </draggable>

        <div class="btn add-project" @click="store.addTab()">
          <IconPlus />
        </div>
      </div>
    </header>

    <!-- main content -- kanban -->
    <main>
      <template v-if="store.getActiveTab">
        <draggable
          :list="store.getActiveTab?.sections"
          :animation="200"
          item-key="id"
          class="kanban"
          group="sections"
          handle=".section-container"
        >
          <template #item="{ element }">
            <div class="section-container">
              <header class="head">
                <h2>
                  <input
                    type="text"
                    v-model="element.label"
                    placeholder="Section label"
                  />
                </h2>
                <div class="btn add" @click="store.addTask(element)">
                  <span> Add Task </span>
                  <IconPlus />
                </div>
              </header>

              <draggable
                v-model="element.tasks"
                :animation="200"
                tag="ul"
                item-key="id"
                class="section"
                group="tasks"
              >
                <template #item="{ element }">
                  <li @click="store.openTask(element)" class="task">
                    <span>{{ element.title }}</span>
                    <span class="state">
                      <IconDone v-show="element.completed" />
                    </span>
                  </li>
                </template>
              </draggable>
            </div>
          </template>

          <template #footer>
            <div class="btn add" @click="store.addSection(getActiveTab)">
              <span> Add Section </span>
              <IconPlus />
            </div>
          </template>
        </draggable>
      </template>

      <template v-else>
        <div class="welcome-container">
          <h1>Welcome to task manager!</h1>
        </div>
      </template>
    </main>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 40px;
$main-height: calc(100vh - #{$header-height} * 2);
$kanban-bg: rgb(255, 255, 255);
$border-color: rgb(236, 236, 236);

.draggable.header {
  z-index: 10;
}

header {
  display: flex;
  align-items: center;

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
          background-color: $kanban-bg;
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
}
main {
  overflow: auto;
  height: $main-height;
  background-color: var(--kanban-bg-color);

  .welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: inherit;
    user-select: none;
  }

  .kanban {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 270px;
    box-sizing: border-box;
    width: fit-content;
    height: 100%;

    $margin: 8px;
    $padding: 4px;

    .section-container {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 8px;
      // border: 1px solid $border-color;
      margin: $margin;
      padding: $padding;

      header.head {
        height: 40px;
        box-shadow: 0 2px 2px $border-color;

        h2 {
          padding: 3px;
          display: flex;
          background-color: darken($border-color, 5%);
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
          border: 1px solid $border-color;
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

      .section {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
        border-radius: 4px;
        height: calc(100vh - 120px - #{$margin * 2} - #{$padding * 2} - 16px);
        overflow-y: auto;
        overflow-x: hidden;

        .task {
          border-left: 4px solid $border-color;
          border-radius: 4px;
          padding: 4px 6px;
          display: flex;
          justify-content: space-between;

          &:hover {
            background-color: rgb(241, 241, 241);
          }
          .state {
            svg {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border: 2px dashed #ccc;
      border-radius: 8px;
      margin: $margin;
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
  }
}
</style>

<style>
.btn {
  cursor: pointer;
}
</style>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
