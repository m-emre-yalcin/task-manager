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

    <div
      :class="{ 'title-container': true, 'justify-left': items.length == 0 }"
    >
      <icon-carrot />

      <span>{{ title }}</span>

      <div></div>
    </div>
  </header>
</template>


<style lang="scss" scoped>
header {
  padding: 8px;
  height: 40px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 20px;

  .title-container {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;

    &.justify-left {
      span {
        margin-left: 8px;
      }
    }
    &:not(.justify-left) {
      justify-content: space-between;
      margin-left: 0;
      span {
        margin-left: -20px;
      }
    }

    svg {
      width: 20px;
      height: 20px;
      fill: white;
      margin-left: 8px;
    }
    span {
      font-size: 16px;
      color: white;
    }
  }
  nav {
    display: inline-flex;
    padding: 0;
    margin-left: 26px;

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