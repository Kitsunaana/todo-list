import { todosStore } from "@entities/todo"
import { filters, labels } from "@shared/const/filters"
import {Button, Flex, Typography} from "antd"
import { observer } from "mobx-react-lite"

const { Text } = Typography

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