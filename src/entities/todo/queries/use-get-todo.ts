import { todosApi } from '@shared/api/todos-api';
import { TodoDto } from '@shared/types';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';

export const useGetTodo = (id: number) => {
  const { data, isPending, isError } = useQuery({
    enabled: typeof id === "number",
    queryKey: ["todo", id],
    queryFn: () => toast.promise<TodoDto.Todo, Error>(todosApi.getByIdTodo(id), {
      error: { render({ data }) { return data.message } }
    }),
  })


  return { todo: data, isLoadingGet: isPending, isErrorGet: isError }
}