import { useContextMenu } from "@shared/hooks/use-context-menu";
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";
import { TodoDto } from "@shared/types";
import { Icon } from "@shared/ui/icon";
import { IconButton } from "@shared/ui/icon-button";
import { Checkbox, Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { forwardRef } from "react";
import { todosStore } from "../model/store";
import { TodoContextMenu } from "./todo-context-menu";
import { TodoStatus } from "./todo-status";

const { Text } = Typography

interface TodoItemProps {
  id: number
  description: string
  status: TodoDto.Statuses
  onRemove: (id: number, description: string) => void
  onChangeStatus: () => void
}

export const TodoItem = observer(forwardRef<HTMLElement, TodoItemProps>((props, ref) => {
  const { id, description, onRemove, status, onChangeStatus } = props

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
          onChangeStatus={onChangeStatus}
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
