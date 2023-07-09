import React, { type Context, createContext, useContext, type PropsWithChildren, useState, type Dispatch, type SetStateAction } from "react"
import type { DirEntry, FileTypeEntity, ReactState } from "../domain"
import { HistoryBuffer } from "../domain/history_buffer"
import { open } from "@tauri-apps/api/shell"
import { invoke } from "@tauri-apps/api"
import type { Payload } from "../domain/dtos"

type OpenActions = { [k in FileTypeEntity]: (path: DirEntry) => Promise<void> }

export interface AppState {
  directory?: Payload<DirEntry[]>
  setDirectory: Dispatch<SetStateAction<Payload<DirEntry[]>>>
  history: HistoryBuffer
  changeDir: (path: string) => void
  reloadDir: () => void
  prevDir: () => void
  nextDir: () => void
  openActions: OpenActions
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AppContext: Context<AppState> = createContext<AppState>({} as AppState)

export const AppStateProvider = (props: PropsWithChildren<unknown>) => {
  const [directory, setDirectory]: ReactState<Payload<DirEntry[]>> = useState<Payload<DirEntry[]>>({ data: undefined, error: undefined })
  const [history, setHistory]: ReactState<HistoryBuffer> = useState(new HistoryBuffer(["/"], 0, 0, 50))

  const changeDir = async (path: string) => {
    setHistory(history.push(path))
    const dir: Payload<DirEntry[]> = await invoke("readdir_handler", { path })
    setDirectory(dir)
  }

  const reloadDir = async () => {
    const dir: Payload<DirEntry[]> = await invoke("readdir_handler", { path: history.peek() })
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

  const openActions: OpenActions = {
    File: async (entry: DirEntry) => {
      try {
        await open(entry.path)
      } catch (e) {
        console.error(e)
      }
    },
    Symlink: async (entry: DirEntry) => {
      try {
        const payload: Payload<DirEntry> = await invoke("readlink_handler", { path: entry.path })
        if (payload?.data) {
          await changeDir(payload.data.path)
        }
      } catch (e) {
        console.error(e)
      }
    },
    Directory: async (entry: DirEntry) => {
      try {
        await changeDir(entry.path)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const initialState: AppState = {
    directory,
    setDirectory,
    history,
    changeDir,
    reloadDir,
    prevDir,
    nextDir,
    openActions
  }

  return (
    <AppContext.Provider value={initialState}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext: () => AppState = () => useContext(AppContext)
