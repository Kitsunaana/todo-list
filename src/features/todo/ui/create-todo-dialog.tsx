import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { UpsertDialog } from "@shared/ui/upsert-dialog"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { DeepPartial, FormProvider, useForm } from "react-hook-form"
import { useCreateTodo } from "../queries/use-create-todo"
import { CreateTodoFormFields } from "../types/types"
import { CreateTodoForm } from "./create-todo-form"

const defaultValues: DeepPartial<CreateTodoFormFields> = {
  description: "",
  name: "",
  status: "open"
}

export const CreateTodoDialog = observer(() => {
  const { isOpenCreate } = useUpsertDialog()

  const { onCreateTodo, isLoadingCreate, isSuccessCreate } = useCreateTodo()

  const methods = useForm<CreateTodoFormFields>({ defaultValues })

  useEffect(() => { methods.reset() }, [isSuccessCreate, methods])
  
  return (
    <FormProvider {...methods}>
      <UpsertDialog
        title="Создание задачи"
        isOpen={isOpenCreate}
        isLoading={isLoadingCreate}
        onSubmit={onCreateTodo}
        content={<CreateTodoForm isLoading={isLoadingCreate} />}
      />
    </FormProvider>
  )
})