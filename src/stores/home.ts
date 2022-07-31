import { defineStore } from 'pinia'

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
                section: 4,
                notes: [],
              },
            ],
          },
        ],
        tags: ["venture", "work"],
      },
    ],
    openedTasks: []
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
    addSection(project: any) {
      project.sections.push({
        id: Date.now(),
        label: "New section",
        tasks: [],
      });
    },
    removeSection() { return },
    addTask(section: any) {
      if (this.getActiveTab) {
        section.tasks.push({
          id: Date.now(),
          title: 'New task',
          completed: false,
          section: section.id,
          notes: []
        })

        return
      }

      throw new Error('There is no active tab')
    },
    removeTask() { return },
    openTask(task: any) {
      this.openedTasks.push(task)

      window.open(
        window.location.origin + "/task/" + task.id,
        "_blank",
        "top=300,left=300,nodeIntegration=no"
      )

      // save to ls for sustain multiple state
      localStorage.setItem('openedTasks', JSON.stringify(this.openedTasks))
    },
    getActiveTask(taskID: number) {
      // get item from another tab
      const openedTasks = localStorage.getItem('openedTasks')

      if (openedTasks && Array.isArray(openedTasks)) {
        return openedTasks.find(task => task.id === taskID)
      }

      return {}
    },
    closeTask() { return }
  }
})