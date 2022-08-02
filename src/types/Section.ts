import type { Task } from "./Task";
export type SectionColors =
  | "s-todo"
  | "s-progress"
  | "s-done"
  | "s-special1"
  | "s-special2"
  | "s-special3"
  | "s-special4";
export interface Section {
  id?: number;
  label: string;
  tasks: Array<Task>;
  color: SectionColors;
}
