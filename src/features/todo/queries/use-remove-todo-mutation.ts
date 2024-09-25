import { todosStore } from "@entities/todo"
import { todosApi } from "@shared/api/todos-api"
import { queryClient } from "@shared/config/query-client"
import { TodoDto } from "@shared/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useRemoveTodoMutation = () => {
  return useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: number) => toast.promise<number, Error>(todosApi.removeTodo(id), {
      error: { render({ data }) { return data.message } },
      success: "Задача успешно удалена"
    }),
    onSuccess: (todoId) => {
      queryClient.setQueryData(["todos", todosStore.filter], (oldData: { pages: TodoDto.GetTodosResponse[] }) => {
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: page.data.filter(todo => todo.id !== todoId)
          }))
        }
      })
    }
  })
}