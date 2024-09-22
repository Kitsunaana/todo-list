export interface Todo {
  id: number
  createdAt: string
  updatedAt: string
  name: string | null
  publishedAt: string
  description: string
  status: "done" | "working" | "open"
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
