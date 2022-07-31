import type { Task } from "./Task"
export interface Section {
  id?: number
  label: string
  tasks: Array<Task>
}