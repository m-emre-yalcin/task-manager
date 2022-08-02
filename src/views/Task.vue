<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";
import IconPlus from "../components/icons/IconPlus.vue";

const store = useHomeStore();
const route = useRoute();
const { activeTask } = storeToRefs(store);

const addNote = () => {
  activeTask.value.notes.unshift({
    id: activeTask.value.notes.length + 1,
    text: "",
    created_by: {
      id: 1,
      name: "Emre",
      avatar: null,
    },
  });
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

      <div class="state">
        <IconClose />
      </div>
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
          <label for="list">Notes</label>

          <div class="btn add-note" @click="addNote()">
            <span>Add</span>
            <IconPlus />
          </div>
        </div>

        <ul class="list">
          <li v-for="note in activeTask.notes" :key="note.id">
            <div class="user" :title="note.created_by.name">
              <img
                src="@/assets/images/user-placeholder.png"
                width="30"
                height="30"
              />
            </div>
            <div class="text">
              <input type="text" v-model="note.text" placeholder="New note" />
            </div>
          </li>
        </ul>
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
        gap: 1rem;
        margin-top: 2rem;

        li {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          .user {
            display: flex;
            img {
              border-radius: 4px;
            }
          }
          .text {
            display: flex;
            margin-left: 8px;
            flex: 1;
            input {
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
      }
    }
  }
}
</style>