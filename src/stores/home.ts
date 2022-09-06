import { defineStore } from "pinia";
import type { User, Task, Section, Project, ProjectColors, ActionsBox } from "@/types";

export const useHomeStore = defineStore({
  id: "home",
  state: () => ({
    user: {
      id: 1,
      name: "local",
      avatar: null
    },
    tabs: [] as Array<Project>,
    activeTask: {} as Task,
    actionsbox: {} as ActionsBox
  }),
  getters: {
    getActiveTab: (state) => {
      return state.tabs.find((tab) => tab.activated);
    }
  },
  actions: {
    switchTab(index: number) {
      this.tabs.map((tab) => {
        tab.activated = false;
        return tab;
      });
      this.tabs[index].activated = true;
    },
    addTab() {
      const id = this.tabs.length + 1;

      this.tabs.push({
        id,
        pinned: false,
        title: "New Tab " + id,
        priority: 2,
        completed: false,
        archieved: false,
        activated: false,
        sections: [],
        tags: [],
        color: "p-white"
      });
      this.switchTab(this.tabs.length - 1);
    },
    removeTab(index: number) {
      // make previous tab active if this is active
      if (this.tabs[index].activated && index > 0) {
        this.tabs[index - 1].activated = true;
      }

      this.tabs.splice(index, 1);
    },
    changeProjectTheme(project: Project, theme: ProjectColors) {
      project.color = theme
    },
    addSection(project: Project) {
      project.sections.push({
        id: Date.now(),
        label: "New section",
        tasks: [],
        color: "s-todo"
      });
    },
    removeSection(index: number) {
      this.getActiveTab?.sections.splice(index, 1)
    },
    addTask(section: Section) {
      if (this.getActiveTab) {
        section.tasks.unshift({
          id: Date.now(),
          title: "New task",
          completed: false,
          description: "",
          section: Number(section.id),
          list: []
        });

        return;
      }

      throw new Error("There is no active tab");
    },
    removeTask(section: Section, index: number) {
      section.tasks.splice(index, 1)
    },
    openTask(task: Task) {
      const win = window.open(
        window.location.href + "task/" + task.id,
        "_blank",
        "width=450"
      );
      const refreshLS = () => {
        this.$state.tabs = JSON.parse(window.localStorage.home).tabs;
      };

      // Sync with new window
      ["click", "keyup", "change", "blur"].forEach((event) => {
        win?.addEventListener(event, () => {
          refreshLS();
        });
      });
    },
    getActiveTask(id: number | undefined) {
      const taskId = Number(id);

      // Q(n3) complexity - needs performant way to get active task
      this.tabs.find((tab) => {
        return tab.sections.find((section) => {
          return section.tasks.find((task) => {
            if (task.id === taskId) {
              return (this.activeTask = task);
            }
          });
        });
      });
    },
    openActions(
      payload: any,
      e: Event
    ) {
      this.actionsbox = {
        data: payload,
        event: e
      };

      e.stopPropagation()
      e.preventDefault()
    },
    closeActions() {
      this.actionsbox = {}
    }
  },
  // Persistent Store Details: https://seb-l.github.io/pinia-plugin-persist
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["tabs", "user"]
      }
    ]
  }
});
