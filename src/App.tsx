// import {TodosPage} from "./pages/todos";
import TodosPage from "@pages/todos/todos-page"
import { UpsertDialogProvider } from "@shared/context/upsert-dialog-context"

export const App = () => {
  return (
    <UpsertDialogProvider>
      <TodosPage />
    </UpsertDialogProvider>
  )
}
