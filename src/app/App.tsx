// import {TodosPage} from "./pages/todos";
import TodosPage from "@pages/todos/todos-page";
import { UpsertDialogProvider } from "@shared/context/upsert-dialog-context";
import { AppProvider } from "./providers/app-provider";

export const App = () => {
  return (
    <AppProvider>
      <UpsertDialogProvider>
        <TodosPage />
      </UpsertDialogProvider>
    </AppProvider>
  )
}
