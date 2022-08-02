<script lang="ts" setup>
import IconCarrot from "./icons/IconCarrot.vue";
export interface Props {
  items: Array<{
    name: string;
    href: string;
  }>;
  title: string;
}

defineProps<Props>();
</script>

<template>
  <header class="draggable">
    <nav class="not-draggable">
      <ul>
        <li v-for="item in items" :key="item.href">
          <router-link :to="item.href">
            <span class="name">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="title-container">
      <icon-carrot />

      <span>{{ title }}</span>
    </div>

    <span></span>
  </header>
</template>


<style lang="scss" scoped>
header {
  padding: 8px;
  height: 40px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    text-align: center;
    pointer-events: none;

    svg {
      width: 20px;
      height: 20px;
      fill: white;
    }
    span {
      font-size: 16px;
      color: white;
      margin-left: 8px;
    }
  }
  nav {
    display: inline-flex;
    padding: 0;

    ul {
      display: flex;
      flex-direction: row;
      align-items: center;

      li {
        a {
          cursor: pointer;
          text-decoration: none;
          color: rgb(214, 214, 214);
          font-weight: 300;
          padding: 4px 6px;
          font-size: 14px;
          border-radius: 4px;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
}
</style>