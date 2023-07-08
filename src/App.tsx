import React, { useEffect } from "react"
import "./App.css"
import { Header } from "./components/header/Header"
import { Page } from "./components/layout/Page"
import { Sidebar } from "./components/sidebar/Sidebar"
import { type AppState, useAppContext } from "./context"
import { open } from "@tauri-apps/api/shell"

function App () {
  const { reloadDir }: AppState = useAppContext()

  useEffect(() => {
    void (async () => {
      reloadDir()
    })()
  }, [])

  const openFile = async (): Promise<void> => {
    try {
      await open("/home/wtman/scrapyard/rust-pg/")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Page />
      <button style={{ marginLeft: "20rem" }} onClick={openFile} >Open file</button>
    </>
  )
}

export default App
