import { useContextMenu } from "@shared/hooks/use-context-menu";
import { Checkbox, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { TodoContextMenu } from "./todo-context-menu";
import { todosStore } from "../model/store";
import { IconButton } from "@shared/ui/icon-button";
import { Typography } from "antd"
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";
import { Icon } from "@shared/ui/icon";
import { forwardRef } from "react";
import { TodoDto } from "@shared/types";
import { TodoStatus } from "./todo-status";

const { Text } = Typography

interface TodoItemProps {
  id: number
  description: string
  status: TodoDto.Statuses
  onRemove: (id: number, description: string) => void
}

export const TodoItem = observer(forwardRef<HTMLElement, TodoItemProps>((props, ref) => {
  const { id, description, onRemove, status } = props

  const menu = useContextMenu()
  const upsertDialog = useUpsertDialog()

  return (
    <Flex
      ref={ref}
      key={id}
      align="center"
      justify="space-between"
      onContextMenu={(event) => menu.open(event)}
      style={{ padding: "6px 8px" }}
    >
      {menu.isOpen && (
        <TodoContextMenu
          id={id}
          description={description}
          ref={menu.ref}
          close={menu.close}
          onEdit={upsertDialog.onOpen}
          onRemove={onRemove}
        />
      )}
      <Flex gap={8}>
        {todosStore.isShowSelected && (
          <Checkbox 
            checked={todosStore.selected[id]} 
            onClick={(event) => {
              event.stopPropagation()
              todosStore.onToggleSelected(id)
            }} 
          />
        )}
        {todosStore.hasFavorites(id) && (
          <Icon name="addFavorite" color="#e91e63" />
        )}
        <Text>{description}</Text>
      </Flex>
      <Flex align="center" gap={8}>
        {!todosStore.settings.isShowStatus && (
          <TodoStatus status={status} />
        )}
        <IconButton 
          name="actions" 
          onClick={(event) => {
            event.stopPropagation()
            menu.open(event)
          }} 
        />
      </Flex>
    </Flex>
  )
}))
