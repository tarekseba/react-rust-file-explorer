import React from "react"
import { ChevronIcon } from "../icons/ChevronIcon"
import { HomeIcon } from "../icons/HomeIcon"

interface Props {
  isRoot?: boolean
  chevron?: boolean
  path?: string
}

export const PathBreadCrumb = ({ isRoot = false, ...props }: Props) => {
  if (isRoot) {
    return (
      <li className="flex flex-row gap-2 text-gray-600/80 tracking-wide">
        <HomeIcon highlighted />
      </li>
    )
  }
  return (
    <li className="flex flex-row gap-2 text-gray-600/80 tracking-wide">
      {props.chevron && <ChevronIcon direction="right" size={6}/>}
      <a href="#">{props.path}</a>
    </li>
  )
}
