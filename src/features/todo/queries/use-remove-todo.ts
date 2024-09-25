import { useGetConfirmation } from "@shared/lib/confirmation";
import { useRemoveTodoMutation } from "./use-remove-todo-mutation";

export const useRemoveTodo = () => {
  const getConfirmation = useGetConfirmation()
  const mutation = useRemoveTodoMutation()

  return async (todoId: number, description: string) => {
    const confirmation = await getConfirmation({
      description: `Вы уверены, что хотите удалить задачу: ${description}`,
      confirmText: "Удалить"
    })

    if (confirmation) mutation.mutate(todoId)
  }
}

