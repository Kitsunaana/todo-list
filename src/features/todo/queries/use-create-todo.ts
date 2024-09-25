import { toast } from 'react-toastify';
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { useMutation } from "@tanstack/react-query"
import { CreateTodo } from '@shared/types/todos/types';
import { queryClient } from '@shared/config/query-client';
import { TodoDto } from '@shared/types';
import { todosApi } from '@shared/api/todos-api';
import { todosStore } from '@entities/todo';

export const useCreateTodo = () => {
  const upsertDialog = useUpsertDialog()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (data: CreateTodo) => toast.promise<TodoDto.Todo, Error>(
      todosApi.createTodo(data),
      {
        pending: "Идет создание задачи",
        success: "Задача успешно создана",
        error: { render: ({ data }) => data.message }
      }
    ),
    onSuccess: (data) => {
      upsertDialog.onClose()

      queryClient.setQueryData(["todos", todosStore.url], (oldData: TodoDto.GetTodosResponse) => {
        return {
          ...oldData,
          data: oldData.data.concat([data])
        }
      })
    },
  })

  return { onCreateTodo: mutate, isLoadingCreate: isPending, isSuccessCreate: isSuccess }
}