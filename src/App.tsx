import React, { useEffect } from "react"
import { invoke } from "@tauri-apps/api"
import "./App.css"
import { Header } from "./components/header/Header"
import { Page } from "./components/layout/Page"
import { Sidebar } from "./components/sidebar/Sidebar"
import { type AppState, useAppContext } from "./context"
import { type DirEntry, ROOT_PATH } from "./domain"

const asyncFunction = async (): Promise<DirEntry[]> => {
  const dirs: DirEntry[] = await invoke("readdir_handler", { path: ROOT_PATH })
  return dirs
}

function App () {
  const { directory, setDirectory }: AppState = useAppContext()

  console.log("LOLstate", directory)

  useEffect(() => {
    void (async () => {
      const dirEntries: DirEntry[] = await asyncFunction()
      setDirectory(dirEntries)
    })()
  }, [])
  return (
    <>
      <Header />
      <Sidebar />
      <Page />
      <button onClick={asyncFunction} className="ml-52">invoke hello world</button>
    </>
  )
}

export default App
