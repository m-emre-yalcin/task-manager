<script lang="ts" setup>
import { useHomeStore } from "../stores/home";
import IconPlus from "./icons/IconPlus.vue";
const store = useHomeStore();
</script>

<template>
  <div class="welcome-container">
    <h1>Welcome to task manager!</h1>

    <div class="start-container">
      <div
        class="btn add-project"
        @click="store.addTab()"
        title="Start one project"
      >
        <IconPlus />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: inherit;
  user-select: none;
  color: white;

  .start-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-size: 0.8rem;
      margin-bottom: 4px;
      opacity: 0.8;
    }

    .btn.add-project {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 20px;
      background-color: rgb(110, 0, 98);
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
</style>