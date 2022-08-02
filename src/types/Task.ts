import type { User } from "./User";
export interface SubTask {
  id: number;
  text: string;
  completed: boolean;
  created_by: User;
}
export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  section: number;
  list: Array<SubTask>;
}
