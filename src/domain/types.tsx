export type EntityType = "DIR" | "FILE"

export interface Item {
  label: string
  icon: React.ReactElement
}

export interface File {
  path: string
  name: string
  type: EntityType
}
