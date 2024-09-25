// import {TodosPage} from "./pages/todos";
import TodosPage from "@pages/todos/todos-page"
import { UpsertDialogProvider } from "@shared/context/upsert-dialog-context"
import {ReactNode} from "react";
import {ComposeChildren} from "../shared/lib/react.tsx";
import {Confirmations} from "../widgets/confirmations";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ComposeChildren>
      <Confirmations />
      {children}
    </ComposeChildren>
  )
}

export const App = () => {
  return (
    <AppProvider>
      <UpsertDialogProvider>
        <TodosPage />
      </UpsertDialogProvider>
    </AppProvider>
  )
}
