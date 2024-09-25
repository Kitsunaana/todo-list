import { useGetConfirmation } from "@shared/lib/confirmation"
import { useRemoveTodoMutation } from "./use-remove-todo-mutation"

export const useRemoveTodos = () => {
  const getConfirmation = useGetConfirmation()
  const mutation = useRemoveTodoMutation()

  return async (todoIds: number[], description: string) => {
    const confirmation = await getConfirmation({
      description,
      confirmText: "Удалить"
    })

    if (confirmation) todoIds.forEach((todoId) => mutation.mutate(todoId))
  }
}