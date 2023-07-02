import React from "react"
import { PathBreadCrumb } from "./PathBreadCrumb"
interface Props {
  crumbs: string[]
}

export const PathBreadCrumbs = ({ crumbs }: Props) => {
  return (
    <nav>
      <ul className="flex flex-row gap-2">
        {crumbs?.map((crumb: string, index: number) => <PathBreadCrumb path={crumb} chevron={index !== 0} key={`${crumb}_${index}`}/>)}
      </ul>
    </nav>
  )
}
