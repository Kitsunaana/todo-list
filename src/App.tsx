import {useQuery} from "@tanstack/react-query";
import { List } from 'antd';
import {z, ZodError, ZodType} from "zod";

export class ValidationError extends Error {
  constructor(message: string, public readonly cause: ZodError) {
    super(message)
  }
}

export const validation = <T extends ZodType> (schema: T, data: unknown): z.infer<T> => {
  const result = schema.safeParse(data)
  if (result.success) return result.data

  throw new ValidationError("Validation error", result.error)
}

interface Todo {
  id: number
  createdAt: string
  updatedAt: string
  name: string | null
  publishedAt: string
  description: string
  status: "done" | "working" | "open"
}

interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

interface GetTodosResponse {
  data: Todo[]
  meta: {
    pagination: Pagination
  }
}

const todoSchema = z.object({
  id: z.number(),
  attributes: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    name: z.string().nullable(),
    publishedAt: z.string(),
    description: z.string(),
    status: z.enum(["done", "working", "open"])
  })
})

const paginationSchema = z.object({
  page: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

const todosSchema = z.object({
  data: z.array(todoSchema),
  meta: z.object({
    pagination: paginationSchema
  })
})

const todosApi = {
  getAll: async (): Promise<GetTodosResponse> => {
    const response = await fetch("https://cms.laurence.host/api/tasks", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()
    const validatedData =  validation(todosSchema, data)

    const transformedData = {
      ...validatedData,
      data: validatedData.data.map(({ id, attributes }) => ({ id, ...attributes }))
    }

    return transformedData as GetTodosResponse
  }
}

function App() {
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll
  })

  const todosDescription = todos?.data.map(todo => todo.description)

  return (
    <>
      <List
        size="small"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={todosDescription}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  )
}

export default App
