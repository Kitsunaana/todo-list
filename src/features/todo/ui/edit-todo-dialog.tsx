import { UpsertDialog } from "@shared/ui/upsert-dialog"
import { FormProvider, useForm } from "react-hook-form"
import { CreateTodoFormFields } from "../types/types"
import { useGetTodo } from "@entities/todo"
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { useEditTodo } from "../queries/use-edit-todo"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { EditTodoForm } from "./edit-todo-form"

export const EditTodoDialog = observer(() => {
  const { onEditTodo } = useEditTodo()
  const { isOpenEdit, id } = useUpsertDialog()

  const { todo, isLoadingGet } = useGetTodo(id as number)

  const methods = useForm<CreateTodoFormFields>({
    defaultValues: {
      description: "",
      name: "",
      status: "open"
    }
  })

  useEffect(() => { methods.reset(todo) }, [todo, methods])
  
  return (
    <FormProvider {...methods}>
      <UpsertDialog
        isOpen={isOpenEdit}
        isLoading={isLoadingGet}
        onSubmit={onEditTodo}
        title={`Редактирование задача`}
        content={<EditTodoForm isLoading={isLoadingGet} />}
      />
    </FormProvider>
  )
})