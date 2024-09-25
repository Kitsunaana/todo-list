import { todosStore } from "@entities/todo"
import { TodoDto } from "@shared/types"
import {Button, Flex, Typography} from "antd"
import { observer } from "mobx-react-lite"

const { Text } = Typography

const filters: Array<TodoDto.Filters> = ["favorite", "open", "working", "done", "all"]
const labels: Record<TodoDto.Filters, string> = {
  favorite: "Избранные",
  open: "Открытые",
  working: "В работе",
  done: "Выполненые",
  all: "Все"
}

export const FilterPopup = observer(() => {
  return (
    <Flex vertical gap={8}>
      <Text>Фильтры</Text>

      {filters.map(filter => (
        <Button
          key={filter}
          type={todosStore.filter === filter ? "primary" : "default"} 
          onClick={() => todosStore.onChangeFilter(filter)}
        >
          {labels[filter]}
        </Button>
      ))}
    </Flex>
  )
})