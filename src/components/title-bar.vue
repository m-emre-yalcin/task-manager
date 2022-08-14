<script lang="ts" setup>
import IconCarrot from "./icons/IconCarrot.vue";
export interface Props {
  title: string;
  items: Array<Item>;
}
export type Item = {
  name: string;
  showList?: boolean;
  list: Array<Item>;
};
defineProps<Props>();

function toggleList(item: Item, value?: boolean) {
  if (typeof arguments[1] !== "undefined") item.showList = value;
  else item.showList = !item.showList;
}
</script>

<template>
  <header class="draggable">
    <nav class="not-draggable">
      <ul>
        <li
          v-for="item in items"
          :key="item.name"
          tabindex="-1"
          @blur.stop.prevent="toggleList(item, false)"
          @click="toggleList(item)"
        >
          <div class="name">{{ item.name }}</div>

          <ul class="drop-down" v-if="item.showList">
            <li v-for="subItem in item.list" :key="subItem.name">
              {{ subItem.name }}
            </li>
          </ul>
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
        position: relative;

        .name {
          cursor: pointer;
          text-decoration: none;
          color: rgb(214, 214, 214);
          font-weight: 400;
          padding: 4px 6px;
          font-size: 14px;
          border-radius: 4px;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }

        ul.drop-down {
          position: absolute;
          display: flex;
          flex-direction: column;
          background-color: white;
          z-index: 10;
          border-radius: 6px;
          left: 0px;
          top: calc(100% + 4px);
          box-shadow: 0 0 24px rgba(0, 0, 0, 0.12);

          li {
            color: rgb(20, 20, 20);
            background-color: white;
            padding: 4px 8px;
            display: flex;
            width: 100%;
            min-width: 140px;
            border-bottom: 1px solid #eee;

            &:first-child {
              border-top-left-radius: 6px;
              border-top-right-radius: 6px;
            }
            &:last-child {
              border-bottom-left-radius: 6px;
              border-bottom-right-radius: 6px;
              border-bottom: unset;
            }

            &:hover {
              background-color: rgb(68, 8, 60);
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>