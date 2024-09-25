import { TodoDto } from "@shared/types"

export const filters: Array<TodoDto.Filters> = ["favorite", "open", "working", "done", "all"]
export const labels: Record<TodoDto.Filters, string> = {
  favorite: "Избранные",
  open: "Открытые",
  working: "В работе",
  done: "Выполненные",
  all: "Все"
}