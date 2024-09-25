import { validation } from "../lib/zod-validation";
import { TodoSchemas, TodoDto } from "../types"

const URL = "https://cms.laurence.host/api/tasks"

export const todosApi = {
  getAll: async (): Promise<TodoDto.GetTodosResponse> => {
    const response = await fetch(`${URL}?sort=createdAt`, {
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
  },

  createTodo: async (payload: TodoDto.CreateTodo) => {
    const response = await fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()

    if (data?.error?.message) throw new Error(data?.error?.message)

    const validatedData = validation(TodoSchemas.todoSchemaResponse, data)
    const { attributes, id } = validatedData.data

    return { id, ...attributes } as TodoDto.Todo
  },

  getByIdTodo: async (todoId: number) => {
    const response = await fetch(`${URL}/${todoId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()

    if (data?.error?.message) throw new Error(data?.error?.message)

    const validatedData = validation(TodoSchemas.todoSchemaResponse, data)
    const { attributes, id } = validatedData.data

    return { id, ...attributes } as TodoDto.Todo
  },

  editTodo: async (payload: TodoDto.EditTodo) => {
    const response = await fetch(`${URL}/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()

    if (data?.error?.message) throw new Error(data?.error?.message)

    const validatedData = validation(TodoSchemas.todoSchemaResponse, data)
    const { attributes, id } = validatedData.data

    return { id, ...attributes } as TodoDto.Todo
  },

  removeTodo: async (todoId: number) => {

  }
}
