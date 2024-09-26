import { useGetConfirmation } from "@shared/lib/confirmation"
import { TodoDto } from "@shared/types"
import { useEditTodo } from "./use-edit-todo"

export const useEditTodos = () => {
  const getConfirmation = useGetConfirmation()
  const mutation = useEditTodo()

  return async (todos: TodoDto.Todo[]) => {
    const confirmation = await getConfirmation({
      description: "Вы уверены, что хотите отметить задачи статусом выполнено",
      confirmText: "Выполнить"
    })

    if (confirmation) todos.forEach((todo) => mutation.onEditTodo({ ...todo, status: "done" }))
  }
}