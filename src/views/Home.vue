<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable";
import IconDone from "../components/icons/IconDone.vue";
import IconClose from "../components/icons/IconClose.vue";
import IconPlus from "../components/icons/IconPlus.vue";

const user = ref({
  id: 1,
  name: "Emre Yalçın",
  avatar: null,
});
const dropdown = ref(false);
const tabs = ref([
  {
    id: 1,
    pinned: true,
    title: "All",
    sections: [],
  },
  {
    id: 2,
    pinned: false,
    title: "Project 1",
    priority: 2,
    completed: false,
    archieved: false,
    sections: [
      {
        id: 1,
        label: "defined",
        tasks: [
          {
            id: 1,
            title: "Task 1",
            completed: false,
            section: 1,
            notes: [
              {
                id: 1,
                text: "note 1 about this task",
                created_by: user,
              },
            ],
          },
          {
            id: 2,
            title: "Task 2",
            completed: false,
            section: 1,
            notes: [],
          },
        ],
      },
      {
        id: 2,
        label: "idle",
        tasks: [],
      },
      {
        id: 3,
        label: "in progress",
        tasks: [
          {
            id: 3,
            title: "Task 3",
            completed: false,
            section: 3,
            notes: [],
          },
        ],
      },
      {
        id: 4,
        label: "done",
        tasks: [
          {
            id: 4,
            title: "Task 4",
            completed: true,
            section: 4,
            notes: [],
          },
        ],
      },
    ],
    tags: ["venture", "work"],
  },
]);
const activeTabIndex = ref(1);
const openedTask: any = ref(null);

// methods
const addTab = () => {
  const id = tabs.value.length + 1;

  tabs.value.push({
    id,
    pinned: false,
    title: "New Tab " + id,
    priority: 2,
    completed: false,
    archieved: false,
    sections: [],
    tags: [],
  });
  activeTabIndex.value = tabs.value.length - 1;
};

const selectTab = (index: number) => {
  activeTabIndex.value = index;
};

const removeTab = (index: number) => {
  if (activeTabIndex.value == index) {
    activeTabIndex.value = 0;
  }

  tabs.value.splice(index, 1);
};

const addTask = (section: any) => {
  section.tasks.push({
    id: Date.now(),
    title: "New task",
    completed: false,
    section: section.id,
    notes: [],
  });
};

const addSection = (project: any) => {
  project.sections.push({
    id: Date.now(),
    label: "New section",
    tasks: [],
  });
};
</script>

<template>
  <div class="task-manager-container">
    <!-- tabs and options -->
    <header>
      <!-- contains all opened projects or settings -->
      <div class="tabs">
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
                active: activeTabIndex === index,
              }"
              @click="selectTab(index)"
            >
              <div class="left">
                <span class="text">{{ element.title }}</span>
              </div>
              <div
                class="right"
                v-show="element.pinned === false"
                @click="removeTab(index)"
              >
                <span class="btn close">
                  <IconClose />
                </span>
              </div>
            </div>
          </template>
        </draggable>

        <div class="btn add-project" @click="addTab()">
          <IconPlus />
        </div>
      </div>

      <div class="user" tabindex="-1" @blur="dropdown = false">
        <div class="img-container" @click="dropdown = !dropdown">
          <!-- spin while saving -->
          <div class="saving-spinner" :class="{ active: dropdown }" />

          <!-- user image -->
          <img
            src="@/assets/images/user-placeholder.png"
            alt="user placeholder image"
            width="40"
            height="40"
          />
        </div>

        <div class="dropdown" v-if="dropdown">
          <ul>
            <li>Projects</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </header>

    <!-- main content -- kanban -->
    <main>
      <draggable
        v-model="tabs[activeTabIndex].sections"
        :animation="200"
        item-key="id"
        class="kanban"
        group="sections"
        handle=".section-container"
      >
        <template #item="{ element }">
          <div class="section-container">
            <header class="head">
              <h2>{{ element.label }}</h2>
              <div class="btn add" @click="addTask(element)">
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
                <li @click="openedTask = element" class="task">
                  <span>{{ element.title }}</span>
                  <span class="state">
                    <IconDone v-show="element.completed" />
                  </span>

                  <Teleport to="body">
                    <div class="overlay" v-if="openedTask === element">
                      <div class="task-container">
                        <header class="row">
                          <h1 class="title" :id="element.title">
                            {{ element.title }}
                          </h1>

                          <div class="state">
                            <IconClose />
                          </div>
                        </header>

                        <main class="row">
                          <textarea
                            :name="`description of ${element.title}`"
                            :id="`description-${element.id}`"
                            cols="30"
                            rows="10"
                          />
                        </main>

                        <footer class="row">
                          <div class="heading">
                            <h3>Notes</h3>
                          </div>

                          <ul class="list">
                            <li v-for="note in element.notes" :key="note.id">
                              <div class="user" :title="note.created_by.name">
                                <img
                                  :src="'@/assets/images/user-placeholder.png'"
                                  width="25"
                                  height="25"
                                />
                              </div>
                              <div class="text">
                                {{ note.text }}
                              </div>
                            </li>
                          </ul>
                        </footer>
                      </div>
                    </div>
                  </Teleport>
                </li>
              </template>
            </draggable>
          </div>
        </template>

        <template #footer>
          <div class="btn add" @click="addSection(tabs[activeTabIndex])">
            <span> Add Section </span>
            <IconPlus />
          </div>
        </template>
      </draggable>
    </main>
  </div>
</template>

<style lang="scss">
$header-height: 40px;
$main-height: calc(100vh - #{$header-height});
$kanban-bg: rgba(255, 255, 255, 1);
$border-color: rgb(236, 236, 236);

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;

  .tabs {
    display: grid;
    align-items: flex-end;
    grid-auto-flow: column;
    justify-content: flex-start;
    width: calc(100vw - 100px);
    padding-left: 8px;
    margin-top: 8px;

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
      height: 1px;
      width: 0;
    }
    ::-webkit-scrollbar-thumb {
      background-color: black;
    }

    .wrapper {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      flex-direction: row;
      gap: 1px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      white-space: nowrap;

      .tab {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 10px;
        user-select: none;
        background-color: darken($kanban-bg, 10%);

        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

        &.pinned {
          width: 40px;
          .right {
            display: none;
          }
        }
        &.active {
          background-color: $kanban-bg;
        }
        &:not(.active) {
          cursor: pointer;

          &:hover {
            background-color: darken($kanban-bg, 70%);
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
      background-color: darken($kanban-bg, 50%);
      border-top-right-radius: 4px;
      &:hover {
        background-color: darken($kanban-bg, 80%);
      }

      svg {
        width: 16px;
        height: 16px;
        fill: rgb(218, 218, 218);
      }
    }
  }

  .user {
    position: relative;
    display: flex;
    place-content: flex-end;
    padding-right: 10px;
    cursor: pointer;

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .saving-spinner {
        transition: transform 0.25s ease;
        background-color: rgb(97, 97, 97);
        border-radius: 6px;
        width: 28px;
        height: 28px;

        &.active {
          transform: scale(1.2);
        }
      }

      img {
        position: absolute;
        border: 1px solid #ccc;
        width: 30px;
        height: 30px;
        border-radius: 6px;
      }
    }

    .dropdown {
      position: absolute;
      right: 8px;
      top: calc(100% + 12px);
      background-color: white;
      border: 1px solid $border-color;
      border-radius: 4px;
      font-size: 0.9em;
      z-index: 99;
      display: flex;
      justify-content: flex-end;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      &::before {
        content: "";
        display: block;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid transparent;
        border-bottom: 6px solid $border-color;
        position: absolute;
        top: -12px;
        right: 9px;
      }
      &::after {
        content: "";
        display: block;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid white;
        position: absolute;
        top: -10px;
        right: 10px;
      }

      ul {
        li {
          min-width: 120px;
          padding: 6px 12px;
          &:hover {
            background-color: rgb(244, 244, 244);
          }
        }
      }
    }
  }
}
main {
  overflow: auto;
  height: $main-height;
  background-color: $kanban-bg;

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
          font-size: 1rem;
          text-indent: 2px;
          background-color: darken($border-color, 5%);
          padding: 2px 4px;
          border-radius: 4px;
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
        height: calc(100vh - 80px - #{$margin * 2} - #{$padding * 2} - 16px);
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
