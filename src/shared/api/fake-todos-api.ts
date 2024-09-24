import { TodoDto } from "@shared/types"
import { BaseTodoFields, CreateTodo, EditTodo } from "@shared/types/todos/types"

interface FakeTodoApi {
  createTodo(data: CreateTodo): Promise<CreateTodo>
  editTodo(data: EditTodo): Promise<EditTodo>
  getByIdTodo(id: number): Promise<TodoDto.Todo>
  getAll(): void
}

type ResultFetchType = "resolve" | "reject"

type MethodsFakeTodosApi = keyof FakeTodoApi

const options: Record<MethodsFakeTodosApi, ResultFetchType> = {
  createTodo: "reject",
  editTodo: "resolve",
  getByIdTodo: "resolve",
  getAll: "resolve"
}

export const fakeTodosApi: FakeTodoApi = {
  createTodo: async (data: BaseTodoFields) => {
    return new Promise<CreateTodo>((resolve, reject) => {
      setTimeout(() => {
        if (options.createTodo === "resolve") resolve(data)

        reject(new Error("Произошла ошибка при создании"))
      }, 1000)
    })
  },

  editTodo: async (data: EditTodo) => {
    return new Promise<EditTodo>((resolve, reject) => {
      setTimeout(() => {
        if (options.editTodo === "resolve") resolve(data)

        reject(new Error("Произошла ошибка при редактировании"))
      }, 1000)
    })
  },

  getByIdTodo: async (id: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (options.getByIdTodo === "resolve") {
          resolve({
            id,
            name: "Имя задачи",
            description: "Удалить лишнюю переменную окружения.",
            status: "done",
            createdAt: "2024-09-20T15:02:07.784Z",
            updatedAt: "2024-09-20T15:02:20.598Z",
            publishedAt: "2024-09-20T15:02:07.783Z"
          })
        }

        reject(new Error("Произошла ошибка при получении задачи"))
      }, 1000)
    })
  },

  getAll() {

  }
}