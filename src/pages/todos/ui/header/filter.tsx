import { todosStore } from "@entities/todo"
import {Button, Flex, Typography} from "antd"
import { observer } from "mobx-react-lite"

const { Text } = Typography

const filters = ["favorite", "open", "working", "done", "all"] as const
const labels = {
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