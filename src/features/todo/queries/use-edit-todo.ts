import { toast } from 'react-toastify';
import { EditTodo } from "@shared/types/todos/types"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from '@shared/config/query-client';
import { TodoDto } from '@shared/types';
import { todosApi } from '@shared/api/todos-api';

export const useEditTodo = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (data: EditTodo) => toast.promise<TodoDto.EditTodo, Error>(todosApi.editTodo(data), {
      success: "Задача успешно обновлена",
      error: { render({ data }) { return data.message } }
    }),
    onSuccess(data) {
      queryClient.setQueryData(["todos"], (oldData: TodoDto.GetTodosResponse) => {
        return {
          ...oldData,
          data: oldData.data.map(todo => todo.id === data.id ? data : todo)
        }
      })
    },
  })

  return { onEditTodo: mutate, isLoadingEdit: isPending, isSuccessEdit: isSuccess }
}