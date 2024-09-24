import { toast } from 'react-toastify';
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { useMutation } from "@tanstack/react-query"
import { fakeTodosApi } from '@shared/api/fake-todos-api';
import { CreateTodo } from '@shared/types/todos/types';
import { queryClient } from '@shared/config/query-client';
import { TodoDto } from '@shared/types';

export const useCreateTodo = () => {
  const { onClose } = useUpsertDialog()

  const { mutate, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (data: CreateTodo) => toast.promise(
      fakeTodosApi.createTodo(data),
      {
        pending: "Идет создание задачи",
        success: "Задача успешно создана",
        error: "Произошла ошибка при создании задача"
      }
    ),
    onSuccess: (data) => {
      onClose()

      queryClient.setQueryData(["todos"], (oldData: TodoDto.GetTodosResponse) => {
        return {
          ...oldData,
          data: oldData.data.concat([
            {
              ...data,
              publishedAt: "",
              updatedAt: "",
              createdAt: "",
              id: Date.now(),
            }
          ])
        }
      })
    },
  })

  return { onCreateTodo: mutate, isLoadingCreate: isPending }
}