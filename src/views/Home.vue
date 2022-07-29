<script setup lang="ts">
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import IconDone from "../components/icons/IconDone.vue";
import IconClose from "../components/icons/IconClose.vue";
import IconPlus from "../components/icons/IconPlus.vue";

const user = ref({
  id: 1,
  name: "Emre Yalçın",
  avatar: null,
});
const tabs = ref([
  {
    id: 1,
    pinned: true,
    title: "All",
  },
  {
    id: 2,
    pinned: false,
    title: "Project 1",
  },
]);
const dropdown = ref(false);
const project = ref({
  id: 1,
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
});
const openedTask: typeof project.value.tasks[0] | undefined = ref(null);

// methods
const addTab = () => {
  const id = tabs.value.length + 1;

  tabs.value.push({
    id,
    pinned: false,
    title: "New Tab " + id,
  });
};

const removeTab = (id: number) => {
  const index = tabs.value.findIndex((tab) => tab.id === id);

  if (index !== -1) {
    tabs.value.splice(index, 1);
  }

  return;
};
</script>

<template>
  <div class="task-manager-container">
    <!-- tabs and options -->
    <header>
      <!-- contains all opened projects or settings -->
      <div class="tabs">
        <div class="wrapper">
          <div
            v-for="tab in tabs"
            :class="{ tab: true, pinned: tab.pinned }"
            :key="tab.id"
          >
            <div class="left">
              <span class="text">{{ tab.title }}</span>
            </div>
            <div class="right" v-show="tab.pinned === false">
              <span class="btn close" @click="removeTab(tab.id)">
                <IconClose />
              </span>
            </div>
          </div>

          <div class="btn add-project" @click="addTab()">
            <IconPlus />
          </div>
        </div>
      </div>

      <div class="user">
        <div class="img-container" @click="dropdown = !dropdown">
          <!-- spin while saving -->
          <div class="saving-spinner" />

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
        v-model="project.sections"
        :animation="200"
        item-key="id"
        class="kanban"
        group="sections"
        handler=".section"
      >
        <template #item="{ element }">
          <div>
            <header class="head">
              <h2>{{ element.label }}</h2>
              <hr />
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
                              <div class="text">{{ note.text }}</div>
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
      </draggable>
    </main>
  </div>
</template>

<style lang="scss">
$header-height: 40px;
$main-height: calc(100vh - #{$header-height});

header {
  background-color: rgb(218, 218, 218);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;

  .tabs {
    display: flex;
    flex: 0.9;

    .wrapper {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      flex-direction: row;

      .tab {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 40px;
        height: 100%;
        padding: 4px 2px;
        border: 1px solid rgb(62, 62, 62);
        background-color: rgb(138, 208, 88);
        user-select: none;

        &.pinned {
          background-color: rgb(66, 186, 128);
          .right {
            display: none;
          }
        }

        .left {
          justify-self: flex-start;

          .text {
            font-weight: 200;
          }
        }

        .right {
          justify-self: flex-end;

          .btn.close {
            padding: 4px;

            svg {
              width: 16px;
              height: 16px;
            }
          }
        }
      }

      .btn.add-project {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .user {
    position: relative;
    display: flex;
    place-content: flex-end;
    padding-right: 1rem;
    cursor: pointer;

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .saving-spinner {
        background-color: red;
        background-image: linear-gradient(240deg, red 60%, blue 100%);
        animation: rotate 2s infinite linear;
        border-radius: 50%;
        width: 34px;
        height: 34px;

        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
      }

      img {
        position: absolute;
        border: 1px solid #ccc;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    .dropdown {
      position: absolute;
      right: 1rem;
      top: 100%;
      margin-top: 4px;
      background-color: white;
      border: 1px solid;
      font-size: 0.9em;

      ul {
        li {
          padding: 4px;
        }
      }
    }
  }
}
main {
  background-color: rgb(220, 220, 220);
  padding: 1rem;
  overflow: auto;
  height: $main-height;

  .kanban {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 270px;
    height: 100%;
    gap: 10px;

    header {
      height: 40px;
    }

    .section {
      display: flex;
      flex-direction: column;
      flex: 1;
      border-radius: 4px;
      background-color: white;
      height: calc(100% - 40px);

      .task {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
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