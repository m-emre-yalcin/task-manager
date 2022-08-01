import type { User } from "./User"
export interface Task {
  id?: number
  title: string
  description: string
  completed: boolean
  section: number
  notes: Array<{ id: number, text: string, created_by: User }>
}