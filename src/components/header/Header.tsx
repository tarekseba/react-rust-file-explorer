import React from "react"
import { Navigation } from "./Navigation"

export const Header = () => {
  return (
    <header className={"flex flex-col items-start justify-around bg-gray-100 fixed top-0 left-0 px-4 w-screen h-20 border-b-gray-400/30 border-[1px]"}>
      <div>Other options to add here</div>
      <Navigation />
    </header>
  )
}
