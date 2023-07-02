import React from "react"
import { List } from "../atoms/lists/List"
import { HomeIcon } from "../icons/HomeIcon"

export const Sidebar = () => {
  return (
    <div className={"flex flex-col py-5 px-5 w-52 h-screen bg-gray-100 fixed top-20"}>
      <List items={[
        { label: "Home", icon: <HomeIcon size={5} /> }
      ]} />
    </div>
  )
}
