import React from "react"
import { PathBreadCrumb } from "./PathBreadCrumb"
interface Props {
  path: string
}

export const PathBreadCrumbs = ({ path }: Props) => {
  const crumbs: string[] = path.split("/")
  const entries = crumbs.slice().filter((entry: string) => entry.length > 0)
  return (
    <nav>
      <ul className="flex flex-row gap-2 h-6">
        <PathBreadCrumb isRoot />
        {entries?.map((crumb: string, index: number) => <PathBreadCrumb path={crumb} chevron key={`${crumb}_${index}`} />)}
      </ul>
    </nav>
  )
}
