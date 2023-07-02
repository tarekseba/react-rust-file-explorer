import React, { type PropsWithChildren } from "react"
import { ArrowIcon } from "../icons/ArrowIcon"
import { UpDownIcon } from "../icons/UpDownIcon"
import { PathBreadCrumbs } from "./PathBreadCrumbs"

const NavigationActionsContainer = ({ children }: PropsWithChildren<unknown>) => <div className="flex gap-3">{children}</div>

export const Navigation = () => (
  <div className="flex flex-row gap-6">
    <NavigationActionsContainer>
      <ArrowIcon direction="left"/>
      <ArrowIcon direction="right"/>
    </NavigationActionsContainer>
    <NavigationActionsContainer>
      <UpDownIcon direction="up"/>
      <UpDownIcon direction="down"/>
    </NavigationActionsContainer>
    <div className={"border-gray-200 border-r-2 rounded-xl bg-gray-300 group-hover:text-green"} />
    <PathBreadCrumbs crumbs={["Home", "Ok"]} />
  </div>
)
