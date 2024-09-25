export type Statuses = "done" | "working" | "open"
export type Filters = "favorite" | "all" | "done" | "working" | "open"

const s: Filters = ""

export interface BaseTodoFields {
  status: Statuses
  description: string
  name: string | null
}

export interface Todo extends BaseTodoFields {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export interface GetTodosResponse {
  data: Todo[]
  meta: {
    pagination: Pagination
  }
}

export interface GetTodoResponse {
  data: Todo,
  meta: {}
}

export interface EditTodo extends BaseTodoFields {
  id: number
}

export interface CreateTodo extends BaseTodoFields {
}