import { createDialogStore, UpsertDialogMethods } from "../stores/dialog-store"
import { createContext, FC, PropsWithChildren, useState } from "react"

export const UpsertDialogContext = createContext<UpsertDialogMethods>(createDialogStore())
export const UpsertDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const [store] = useState(() => createDialogStore())

  return (
    <UpsertDialogContext.Provider value={store}>
      {children}
    </UpsertDialogContext.Provider>
  )
}