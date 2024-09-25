import { todosStore } from "@entities/todo";
import { todosApi } from "@shared/api/todos-api";
import { queryClient } from "@shared/config/query-client";
import { useGetConfirmation } from "@shared/lib/confirmation";
import { TodoDto } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


export const useRemoveTodo = () => {
  const getConfirmation = useGetConfirmation()

  const mutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: number) => toast.promise<number, Error>(todosApi.removeTodo(id), {
      error: { render({ data }) { return data.message } },
      success: "Задача успешно удалена"
    }),
    onSuccess: (todoId) => {
      queryClient.setQueryData(["todos", todosStore.url], (oldData: TodoDto.GetTodosResponse) => {
        return {
          ...oldData,
          data: oldData.data.filter(todo => todo.id !== todoId)
        }
      })
    }
  })

  return async (todoId: number, description: string) => {
    const confirmation = await getConfirmation({
      description: `
        Вы точно хотите удалить задачу:\n\t
        ${description}
      `
    })

    if (confirmation) mutation.mutate(todoId)
  }
}
