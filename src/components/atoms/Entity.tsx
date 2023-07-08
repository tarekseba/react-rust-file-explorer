import React from "react"
import type { DirEntry } from "../../domain/types"
import { EntityIcon } from "../icons/EntityIcon"
import { type AppState, useAppContext } from "../../context"

interface Props {
  entry: DirEntry
}

export const Entity = ({ entry }: Props) => {
  const { openActions }: AppState = useAppContext()

  const onOpen = async () => {
    await openActions[entry.file_type.type](entry)
  }

  return (
    <div onClick={onOpen} className="flex flex-col items-center w-15 hover:bg-gray-100/90 rounded-lg cursor-pointer box-border w-full h-full transition-colors duration-200 ease-in-out">
      <EntityIcon entityType={entry.file_type} />
      <p className="w-full text-center break-words text-ellipsis truncate">{entry.name}</p>
    </div>
  )
}
