import React from "react"
import { ChevronIcon } from "../icons/ChevronIcon"

interface Props {
  chevron: boolean
  path: string
}

export const PathBreadCrumb = (props: Props) => {
  return (
    <li className="flex flex-row gap-2 text-gray-600/80 tracking-wide">
      {props.chevron && <ChevronIcon direction="right" size={6}/>}
      <a href="#">{props.path}</a>
    </li>
  )
}
