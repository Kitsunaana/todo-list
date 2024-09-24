import { toast } from 'react-toastify';
import { fakeTodosApi } from "@shared/api/fake-todos-api"
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from 'react';

export const useGetTodo = (id: number) => {
  const { onClose } = useUpsertDialog()

  const { data, isPending, isError } = useQuery({
    enabled: typeof id === "number",
    queryKey: ["todo", id],
    queryFn: () => toast.promise(fakeTodosApi.getByIdTodo(id), {
      pending: { render() { return "Загружается задача" } },
      error: { render() { return "Произошла ошибка" } }
    }),
    select(data) {
      return data
    },
  })

  useEffect(() => { if (isError) onClose() }, [isError, onClose])

  return { todo: data, isLoadingGet: isPending }
}