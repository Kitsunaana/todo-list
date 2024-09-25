import { TodoDto } from "@shared/types"
import { Mark } from "@shared/ui/mark"
import { todosStore } from "../model/store"
import { labels } from "@shared/const/filters"
import { Typography } from "antd"

const { Text } = Typography

const colors = {
  done: "#388e3c",
  working: "#7e57c2",
  open: "#039be5",
}

interface TodoStatusProps {
  status: TodoDto.Statuses
}

export const TodoStatus = (props: TodoStatusProps) => {
  const { status } = props

  return (
    <Mark
      bgColor={colors[status]}
      onClick={(event) => {
        event.stopPropagation()
        todosStore.onChangeFilter(status)
      }}
    >
      <Text style={{ color: "#fff" }}>
        {labels[status]}
      </Text>
    </Mark>
  )
}