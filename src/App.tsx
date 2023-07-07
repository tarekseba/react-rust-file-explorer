import React, { useEffect } from "react"
import "./App.css"
import { Header } from "./components/header/Header"
import { Page } from "./components/layout/Page"
import { Sidebar } from "./components/sidebar/Sidebar"
import { type AppState, useAppContext } from "./context"

function App () {
  const { reloadDir }: AppState = useAppContext()

  useEffect(() => {
    void (async () => {
      reloadDir()
    })()
  }, [])

  return (
    <>
      <Header />
      <Sidebar />
      <Page />
    </>
  )
}

export default App
