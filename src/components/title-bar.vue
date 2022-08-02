<script lang="ts" setup>
export interface Props {
  items: Array<{
    name: string;
    href: string;
  }>;
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
  </header>
</template>


<style lang="scss" scoped>
header {
  padding: 8px;
  height: 40px;
  background-color: var(--primary-color);
  nav {
    display: inline-flex;
    padding: 0;

    ul {
      display: flex;
      flex-direction: row;
      align-items: center;

      li {
        a {
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