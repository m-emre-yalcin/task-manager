<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/home";

const activeTask = {};
// const route = useRoute();
// const store = useHomeStore();
// const { openedTasks } = storeToRefs(store);

// onMounted(() => {
//   const activeTask = store.getActiveTask(route.query.id);
// });
</script>

<template>
  <div class="overlay">
    <div class="task-container" v-if="activeTask">
      <header class="row">
        <h1 class="title" :id="activeTask.title">
          {{ activeTask.title }}
        </h1>

        <div class="state">
          <IconClose />
        </div>
      </header>

      <main class="row">
        <textarea
          :name="`description of ${activeTask.title}`"
          :id="`description-${activeTask.id}`"
          cols="30"
          rows="10"
        />
      </main>

      <footer class="row">
        <div class="heading">
          <h3>Notes</h3>
        </div>

        <ul class="list">
          <li v-for="note in activeTask.notes" :key="note.id">
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
</template>