import React from "react"
import type { DirEntry } from "../../domain/types"
import { EntityIcon } from "../icons/EntityIcon"

interface Props {
  file: DirEntry
}

export const Entity = ({ file }: Props) => {
  return (
    <div className="flex flex-col items-center w-15 hover:bg-gray-100/90 rounded-lg cursor-pointer box-border w-full h-full transition-colors duration-200 ease-in-out">
      <EntityIcon entityType={file.file_type} />
      <p className="w-full text-center break-words text-ellipsis truncate">{file.name}</p>
    </div>
  )
}
