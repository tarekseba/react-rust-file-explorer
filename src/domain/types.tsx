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

export interface DirEntry {
  name: string
  path: string
  file_type: FileType
}

export interface FileType {
  type: FileTypeEntity
  target: string
}

export type FileTypeEntity = "Directory" | "File" | "Symlink"

export const ROOT_PATH: string = "/"
