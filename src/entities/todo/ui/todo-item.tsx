import { useContextMenu } from "@shared/hooks/use-context-menu";
import { Checkbox, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { TodoContextMenu } from "./todo-context-menu";
import { todosStore } from "../model/store";
import { IconButton } from "@shared/ui/icon-button";
import { Typography } from "antd"

const { Text } = Typography

export const TodoItem = observer((props: { id: number, description: string }) => {
  const { id, description } = props

  const menu = useContextMenu()

  return (
    <Flex
      key={id} 
      align="center" 
      justify="space-between" 
      onContextMenu={(event) => menu.open(event)} 
      style={{ padding: "6px 8px" }}
    >
      {menu.isOpen && (
        <TodoContextMenu 
          id={id} 
          ref={menu.ref} 
          close={menu.close} 
        />
      )}
      <Flex gap={8}>
        {todosStore.isShowSelected && (
          <Checkbox checked={todosStore.selected[id]} onClick={(event) => {
            event.stopPropagation()
            todosStore.onToggleSelected(id)
          }} />
        )}
        <Text>{description}</Text>
      </Flex>
      <IconButton name="actions" onClick={(event) => {
        event.stopPropagation()
        menu.open(event)
      }} />
    </Flex>
  )
})