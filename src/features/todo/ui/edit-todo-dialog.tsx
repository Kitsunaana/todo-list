import { UpsertDialog } from "@shared/ui/upsert-dialog"
import { FormProvider, useForm } from "react-hook-form"
import { EditTodoFormFields } from "../types/types"
import { useGetTodo } from "@entities/todo"
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { useEditTodo } from "../queries/use-edit-todo"
import { observer } from "mobx-react-lite"
import { EditTodoForm } from "./edit-todo-form"
import { useDialogSetValues } from "@shared/context/use-dialog-set-values"
import { useDialogClose } from "@shared/context/use-dialog-close"

const defaultValues: EditTodoFormFields = {
  description: "",
  name: "",
  status: "open"
}

export const EditTodoDialog = observer(() => {
  const { isOpenEdit, id, onClose } = useUpsertDialog()

  const { isLoadingEdit, isSuccessEdit, onEditTodo } = useEditTodo()
  const { todo, isLoadingGet, isErrorGet } = useGetTodo(id as number)

  const methods = useForm<EditTodoFormFields>({ defaultValues })

  useDialogClose({ should: isErrorGet || isSuccessEdit, close: onClose })

  useDialogSetValues<EditTodoFormFields>({
    defaultValues,
    data: todo,
    should: isOpenEdit,
    reset: methods.reset
  })

  return (
    <FormProvider {...methods}>
      <UpsertDialog
        isOpen={isOpenEdit}
        isLoading={isLoadingGet || isLoadingEdit}
        onSubmit={onEditTodo}
        title={`Редактирование задачи ${todo?.name ?? ""}`}
        content={<EditTodoForm isLoading={isLoadingGet} />}
      />
    </FormProvider>
  )
})