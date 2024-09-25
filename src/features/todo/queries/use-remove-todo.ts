import { todosApi } from "@shared/api/todos-api";
import { useGetConfirmation } from "@shared/lib/confirmation";
import { useMutation } from "@tanstack/react-query";


export const useRemoveTodo = () => {
  const getConfirmation = useGetConfirmation()

  const mutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: number) => todosApi
  })

  return async (todoId: number, description: string) => {
    const confirmation = await getConfirmation({
      description: `
        Вы точно хотите удалить задачу:\n\t
        ${description}
      `
    })

    if (confirmation) {
      console.log(todoId)
    }
  }
}
