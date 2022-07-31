import type { Section } from "./Section"
export interface Project {
  id?: number
  pinned: boolean
  title: string
  priority: number
  completed: boolean
  archieved: boolean
  sections: Array<Section>
  activated: boolean
  tags: Array<string>
}