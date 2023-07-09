import React from "react"
import type { DirEntry } from "../../domain/types"
import { Entity } from "../atoms/Entity"
import { type AppState, useAppContext } from "../../context"

export const Explorer = () => {
  const { directory }: AppState = useAppContext()
  return <div className="grid md:grid-cols-4 lg:grid-cols-8 sm:grid-cols-3 gap-4 text-gray-500">
    {directory?.data?.map((entry: DirEntry) => <Entity entry={entry} key={entry.path}/>)}
  </div>
}
