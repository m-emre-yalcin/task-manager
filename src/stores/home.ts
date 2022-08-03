import { defineStore } from 'pinia'
import type { User, Task, Section, Project } from '@/types'

export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
    user: {
      id: 1,
      name: "Emre Yalçın",
      avatar: null,
    },
    tabs: [] as Array<Project>,
    activeTask: {} as Task,
    actions: {
      project: [
        {
          action: 'Rename'
        },
        {
          action: 'Theme'
        },
        {
          action: 'Archieve'
        },
        {
          action: 'Delete'
        }
      ],
      section: [
        {
          action: 'Rename'
        },
        {
          action: 'Color'
        },
        {
          action: 'Delete'
        }
      ],
      task: [
        {
          action: 'Rename'
        },
        {
          action: 'Complete'
        },
        {
          action: 'Delete'
        }
      ]
    }
  }),
  getters: {
    getActiveTab: (state) => {
      return state.tabs.find(tab => tab.activated)
    },
  },
  actions: {
    switchTab(index: number) {
      this.tabs.map(tab => {
        tab.activated = false
        return tab
      })
      this.tabs[index].activated = true
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
        color: 'p-white'
      })
      this.switchTab(this.tabs.length - 1)
    },
    removeTab(index: number) {
      // make previous tab active if this is active
      if (this.tabs[index].activated && index > 0) {
        this.tabs[index - 1].activated = true
      }

      this.tabs.splice(index, 1)
    },
    addSection(project: Project) {
      project.sections.push({
        id: Date.now(),
        label: "New section",
        tasks: [],
        color: 's-todo'
      });
    },
    removeSection() { return },
    addTask(section: Section) {
      if (this.getActiveTab) {
        section.tasks.push({
          id: Date.now(),
          title: 'New task',
          completed: false,
          description: '',
          section: Number(section.id),
          list: []
        })

        return
      }

      throw new Error('There is no active tab')
    },
    removeTask() { return },
    updateTask() { return },
    openTask(task: Task) {
      const win = window.open(
        window.location.origin + "/task/" + task.id,
        "_blank",
        "width=450"
      )
      const refreshLS = () => {
        this.$state.tabs = JSON.parse(window.localStorage.home).tabs
      }

      ['click', 'keyup', 'change'].forEach(event => {
        win?.addEventListener(event, () => {
          refreshLS()
        })
      })
    },
    closeTask() { return },
    getActiveTask(id: number | undefined) {
      const taskId = Number(id)

      // Q(n3) complexity - needs performant way to get active task
      this.tabs.find(tab => {
        return tab.sections.find(section => {
          return section.tasks.find(task => {
            if (task.id === taskId) {
              return this.activeTask = task
            }
          })
        })
      })
    },
    openActions(payload, e) {
      return
    }
  },
  // Persistent Store Details: https://seb-l.github.io/pinia-plugin-persist
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, paths: ['tabs', 'user']
      }
    ]
  }
})