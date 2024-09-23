import { z } from "zod";

export const todoSchema = z.object({
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

export const paginationSchema = z.object({
  page: z.number(),
  pageCount: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

export const todosSchema = z.object({
  data: z.array(todoSchema),
  meta: z.object({
    pagination: paginationSchema
  })
})
