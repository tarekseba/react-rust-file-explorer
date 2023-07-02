import React from "react"
import "./App.css"
import { Header } from "./components/header/Header"
import { Page } from "./components/layout/Page"
import { Sidebar } from "./components/sidebar/Sidebar"

function App () {
  return (
    <>
      <Header/>
      <Sidebar/>
      <Page/>
    </>
  )
}

export default App
