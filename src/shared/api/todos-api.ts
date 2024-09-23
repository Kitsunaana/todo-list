import { validation } from "../lib/zod-validation";
import { TodoSchemas, TodoDto } from "../types"

export const todosApi = {
  getAll: async (): Promise<TodoDto.GetTodosResponse> => {
    const response = await fetch("https://cms.laurence.host/api/tasks?sort=createdAt", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()

    const filteredData = {
      ...data, data: data?.data?.filter(todo => (
        !["done", "working", "open"].includes(todo?.status)
      ))
    }

    const validatedData = validation(TodoSchemas.todosSchema, filteredData)

    const transformedData = {
      ...validatedData,
      data: validatedData.data.map(({ id, attributes }) => ({ id, ...attributes }))
    }

    return transformedData as TodoDto.GetTodosResponse
  }
}
