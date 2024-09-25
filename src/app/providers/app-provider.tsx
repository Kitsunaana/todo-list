import { ComposeChildren } from "@shared/lib/react"
import { Confirmations } from "@widgets/confirmations"
import { ReactNode } from "react"

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ComposeChildren>
      <Confirmations />
      {children}
    </ComposeChildren>
  )
}