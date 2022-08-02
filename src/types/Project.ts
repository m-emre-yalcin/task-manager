import type { Section } from "./Section";

export type ProjectColors =
  | "p-white"
  | "p-red"
  | "p-blue"
  | "p-green"
  | "p-yellow"
  | "p-purple";
export interface Project {
  id?: number;
  pinned: boolean;
  title: string;
  priority: number;
  color: ProjectColors;
  completed: boolean;
  archieved: boolean;
  sections: Array<Section>;
  activated: boolean;
  tags: Array<string>;
}
