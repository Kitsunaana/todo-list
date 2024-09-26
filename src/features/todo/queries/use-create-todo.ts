import { todosStore } from '@entities/todo';
import { todosApi } from '@shared/api/todos-api';
import { queryClient } from '@shared/config/query-client';
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";
import { TodoDto } from '@shared/types';
import { CreateTodo } from '@shared/types/todos/types';
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';

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
    onSuccess: () => {
      upsertDialog.onClose()

      queryClient.invalidateQueries({ queryKey: ["todos", todosStore.filter] })
    },
  })

  return { onCreateTodo: mutate, isLoadingCreate: isPending, isSuccessCreate: isSuccess }
}