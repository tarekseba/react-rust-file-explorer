import React, { type Context, createContext, useContext, type PropsWithChildren, useState, type Dispatch, type SetStateAction } from "react"
import type { DirEntry, ReactState } from "../domain"
import { HistoryBuffer } from "../domain/history_buffer"
import { invoke } from "@tauri-apps/api"

export interface AppState {
  directory?: DirEntry[]
  setDirectory: Dispatch<SetStateAction<DirEntry[]>>
  history: HistoryBuffer
  changeDir: (path: string) => void
  reloadDir: () => void
  prevDir: () => void
  nextDir: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AppContext: Context<AppState> = createContext<AppState>({} as AppState)

export const AppStateProvider = (props: PropsWithChildren<unknown>) => {
  const [directory, setDirectory]: ReactState<DirEntry[]> = useState([] as DirEntry[])
  const [history, setHistory]: ReactState<HistoryBuffer> = useState(new HistoryBuffer(["/"], 0, 0, 50))

  const changeDir = async (path: string) => {
    setHistory(history.push(path))
    const dir: DirEntry[] = await invoke("readdir_handler", { path })
    setDirectory(dir)
  }

  const reloadDir = async () => {
    const dir: DirEntry[] = await invoke("readdir_handler", { path: history.peek() })
    setDirectory(dir)
  }

  const prevDir = async () => {
    // TODO: Change this state dependency later
    setHistory(history.prev())
    await reloadDir()
  }

  const nextDir = async () => {
    // TODO: Change this state dependency later
    setHistory(history.next())
    await reloadDir()
  }

  const initialState: AppState = {
    directory,
    setDirectory,
    history,
    changeDir,
    reloadDir,
    prevDir,
    nextDir
  }

  return (
    <AppContext.Provider value={initialState}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext: () => AppState = () => useContext(AppContext)
