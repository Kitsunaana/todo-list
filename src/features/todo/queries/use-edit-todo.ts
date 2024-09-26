import { todosStore } from '@entities/todo';
import { todosApi } from '@shared/api/todos-api';
import { queryClient } from '@shared/config/query-client';
import { TodoDto } from '@shared/types';
import { EditTodo } from "@shared/types/todos/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';

export const useEditTodo = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["todo"],
    mutationFn: (data: EditTodo) => toast.promise<TodoDto.EditTodo, Error>(todosApi.editTodo(data), {
      success: "Задача успешно обновлена",
      error: { render({ data }) { return data.message } }
    }),
    onSuccess(data) {
      queryClient.setQueryData(["todos", todosStore.filter], (oldData: { pages: TodoDto.GetTodosResponse[] }) => {
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: page.data.map(todo => todo.id === data.id ? data : todo)
          }))
        }
      })
    },
  })

  return { onEditTodo: mutate, isLoadingEdit: isPending, isSuccessEdit: isSuccess }
}