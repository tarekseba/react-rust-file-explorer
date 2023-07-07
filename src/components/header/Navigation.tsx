import React, { type PropsWithChildren } from "react"
import { ArrowIcon } from "../icons/ArrowIcon"
import { UpDownIcon } from "../icons/UpDownIcon"
import { PathBreadCrumbs } from "./PathBreadCrumbs"
import { type AppState, useAppContext } from "../../context"

const NavigationActionsContainer = ({ children }: PropsWithChildren<unknown>) => <div className="flex gap-3">{children}</div>

export const Navigation = () => {
  const { history, prevDir, nextDir }: AppState = useAppContext()
  const path: string = history.peek()

  const handlePrev = () => {
    prevDir()
  }

  const handleNext = () => {
    nextDir()
  }

  return (
    <div className="flex flex-row gap-6">
      <NavigationActionsContainer>
        <ArrowIcon direction="left" highlighted={history.canPrev()} onClickCb={handlePrev} />
        <ArrowIcon direction="right" highlighted={history.canNext()} onClickCb={handleNext} />
      </NavigationActionsContainer>
      <NavigationActionsContainer>
        <UpDownIcon direction="up" />
        <UpDownIcon direction="down" />
      </NavigationActionsContainer>
      <div className={"border-gray-200 border-r-2 rounded-xl bg-gray-300 group-hover:text-green"} />
      <PathBreadCrumbs path={path} />
    </div>
  )
}
