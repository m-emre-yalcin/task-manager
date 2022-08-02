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
    tabs: [
      {
        id: 1,
        pinned: true,
        title: "All",
        sections: [],
        activated: false,
      },
      {
        id: 2,
        pinned: false,
        title: "Project 1",
        priority: 2,
        completed: false,
        archieved: false,
        activated: false,
        sections: [
          {
            id: 1,
            label: "defined",
            tasks: [
              {
                id: 1,
                title: "Task 1",
                completed: false,
                description: '',
                section: 1,
                notes: [
                  {
                    id: 1,
                    text: "note 1 about this task",
                    created_by: { name: 'emre' },
                  },
                ],
              },
              {
                id: 2,
                title: "Task 2",
                completed: false,
                description: '',
                section: 1,
                notes: [],
              },
            ],
          },
          {
            id: 2,
            label: "idle",
            tasks: [],
          },
          {
            id: 3,
            label: "in progress",
            tasks: [
              {
                id: 3,
                title: "Task 3",
                completed: false,
                description: '',
                section: 3,
                notes: [],
              },
            ],
          },
          {
            id: 4,
            label: "done",
            tasks: [
              {
                id: 4,
                title: "Task 4",
                completed: true,
                description: '',
                section: 4,
                notes: [],
              },
            ],
          },
        ],
        tags: ["venture", "work"],
      },
    ],
    activeTask: {} as Task
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
          notes: []
        })

        return
      }

      throw new Error('There is no active tab')
    },
    removeTask() { return },
    updateTask() { return },
    openTask(task: Task) {
      window.open(
        window.location.origin + "/task/" + task.id,
        "_blank"
      )
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