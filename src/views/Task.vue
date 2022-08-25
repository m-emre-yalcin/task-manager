<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";
import IconDone from "../components/icons/IconDone.vue";
import IconTrash from "../components/icons/IconTrash.vue";

const store = useHomeStore();
const route = useRoute();
const { activeTask } = storeToRefs(store);

const addSubTask = () => {
  activeTask.value.list.unshift({
    id: activeTask.value.list.length + 1,
    text: "",
    completed: false,
    created_by: {
      id: 1,
      name: "local",
      avatar: null,
    },
  });
};
const auto_grow = (e) => {
  e.target.style.height = "5px";
  e.target.style.height = e.target.scrollHeight + "px";
};

onMounted(() => {
  // get active task by id
  store.getActiveTask(route.params.id);
});
</script>

<template>
  <div class="task-container" v-if="activeTask">
    <header class="row center">
      <h1 class="title" :id="activeTask.title">
        <input type="text" v-model="activeTask.title" placeholder="Task name" />
      </h1>

      <transition name="complete" mode="out-in">
        <div
          class="state done"
          @click="activeTask.completed = false"
          v-if="activeTask.completed"
        >
          <IconDone />
        </div>
        <div class="state" @click="activeTask.completed = true" v-else>
          <IconDone />
        </div>
      </transition>
    </header>

    <main>
      <div class="input-group">
        <label :for="`description-${activeTask.id}`">Description</label>
        <textarea
          :name="`description of ${activeTask.title}`"
          :id="`description-${activeTask.id}`"
          v-model="activeTask.description"
          cols="30"
          rows="10"
        />
      </div>

      <div class="input-group">
        <div class="row center">
          <label for="list">Sub tasks</label>

          <div class="btn add-note" @click="addSubTask()">
            <span>Add</span>
            <IconPlus />
          </div>
        </div>

        <TransitionGroup tag="ul" name="list" class="list">
          <li
            v-for="(subtask, i) in activeTask.list"
            :key="subtask.id"
            :class="{ done: subtask.completed }"
          >
            <div class="user" :title="subtask.created_by.name">
              <img
                src="../assets/images/user-placeholder.png"
                width="30"
                height="30"
              />
            </div>
            <div class="text">
              <textarea
                v-model="subtask.text"
                placeholder="New note"
                @input="auto_grow"
                @click="auto_grow"
              />
            </div>

            <div class="state trash" @click="activeTask.list.splice(i, 1)">
              <IconTrash />
            </div>
            <transition name="complete" mode="out-in">
              <div
                class="state done"
                @click="subtask.completed = false"
                v-if="subtask.completed"
              >
                <IconDone />
              </div>
              <div class="state" @click="subtask.completed = true" v-else>
                <IconDone />
              </div>
            </transition>
          </li>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.task-container {
  background-color: white;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  color: rgb(24, 24, 24);
  .row {
    display: flex;
    flex-direction: row;
    &.center {
      align-items: center;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
    box-shadow: 0 0 4px rgb(234, 234, 234);
    h1.title {
      margin-left: 8px;
      display: flex;
      flex: 1;
      input {
        font-size: 1.5rem;
        padding: 5px;
        flex: 1;
        border-color: transparent;
        outline: unset;

        &:focus {
          border-color: transparent;
        }
      }
    }
  }
  main {
    padding: 1rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .input-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-weight: 600;
        & + .btn {
          margin-left: 1rem;
        }
      }
      .add-note {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        border: 1px solid rgb(235, 233, 233);
        border-radius: 4px;
        padding: 6px;

        &:hover {
          background-color: rgb(238, 238, 238);
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
      textarea {
        resize: unset;
        border-radius: 4px;
        border: 1px solid #eee;
        outline: unset;
        padding: 8px;
      }
      .list {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;

        li {
          display: flex;
          align-items: flex-start;
          padding: 4px 6px;
          background-color: rgb(255, 255, 255);
          border-bottom: 1px solid #eee;

          &.done {
            background-image: linear-gradient(
              to right,
              rgba(77, 215, 77, 0.188),
              rgba(38, 158, 38, 0.113),
              rgba(127, 197, 206, 0.201)
            );
            border-bottom: 1px solid rgb(212, 219, 214);
          }
          .user {
            display: flex;
            img {
              border-bottom: 1px solid #fefefe;
              border-radius: 50%;
              opacity: 0.8;
            }
          }
          .text {
            display: flex;
            margin-left: 8px;
            flex: 1;

            textarea {
              padding: 5px;
              flex: 1;
              border-color: transparent;
              background-color: transparent;
              outline: unset;
              resize: none;
              overflow: hidden;
              min-height: 46px;

              &:focus {
                border-color: transparent;
              }
            }
          }
          .state {
            margin-left: 6px;
            svg {
              width: 20px;
              height: 20px;
            }

            &.trash {
              padding: 2px;
              &:hover {
                background-color: rgb(251, 167, 167);
              }
              svg {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
  .state {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: rgb(227, 251, 229);
    }
    &.done {
      background-color: rgb(142, 231, 149);
      svg,
      svg path {
        fill: rgb(251, 255, 246);
      }
    }

    svg {
      width: 26px;
      height: 26px;
    }
  }
}
</style>