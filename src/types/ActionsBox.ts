import type { Project, Section, Task } from '@/types';

export interface ActionsBox {
  data: {
    index?: number
    item?: Project | Section | Task
    type: "project" | "section" | "task"
    section?: Section
    project?: Project
    task?: Task
  }
  event: MouseEvent
}
