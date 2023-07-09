import React from "react"
import { Explorer } from "../pages/Explorer"
import { Route, Routes } from "react-router-dom"
// import { Explorer } from "../pages/Explorer"

export const Page = () => {
  return <main className="px-6 py-4 ml-52 mt-20">
    <Routes>
      <Route Component={Explorer} path="/" />
    </Routes>
  </main>
}
