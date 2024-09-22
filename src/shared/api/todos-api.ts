import {validation} from "../lib/zod-validation.ts";
import { TodoSchemas, TodoDto } from "../types"


export const todosApi = {
  getAll: async (): Promise<TodoDto.GetTodosResponse> => {
    const response = await fetch("https://cms.laurence.host/api/tasks", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()
    const validatedData =  validation(TodoSchemas.todosSchema, data)

    const transformedData = {
      ...validatedData,
      data: validatedData.data.map(({ id, attributes }) => ({ id, ...attributes }))
    }

    return transformedData as TodoDto.GetTodosResponse
  }
}
