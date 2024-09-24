import { toast } from 'react-toastify';
import { fakeTodosApi } from "@shared/api/fake-todos-api"
import { EditTodo } from "@shared/types/todos/types"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from '@shared/config/query-client';
import { TodoDto } from '@shared/types';
import { useUpsertDialog } from '@shared/hooks/use-upsert-dialog';

export const useEditTodo = () => {
  const { onClose } = useUpsertDialog()

  const { mutate, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (data: EditTodo) => toast.promise(fakeTodosApi.editTodo(data), {
      pending: "Задача обновляется",
      success: "Задача успешно обновлена",
      error: "При редактировании произошла ошибка"
    }),
    onSuccess(data) {
      onClose()

      queryClient.setQueryData(["todos"], (oldData: TodoDto.GetTodosResponse) => {
        return {
          ...oldData,
          data: oldData.data.map(todo => todo.id === data.id ? data : todo)
        }
      })
    },
  })

  return { onEditTodo: mutate, isLoadingEdit: isPending }
}