import React, { type Context, createContext, useContext, type PropsWithChildren, useState, type Dispatch, type SetStateAction } from "react"
import type { DirEntry, ReactState } from "../domain"

export interface AppState {
  directory?: DirEntry[]
  setDirectory: Dispatch<SetStateAction<DirEntry[]>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AppContext: Context<AppState> = createContext<AppState>({} as AppState)

export const AppStateProvider = (props: PropsWithChildren<unknown>) => {
  const [directory, setDirectory]: ReactState<DirEntry[]> = useState([] as DirEntry[])

  const initialState: AppState = {
    directory,
    setDirectory
  }

  return (
    <AppContext.Provider value={initialState}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext: () => AppState = () => useContext(AppContext)
