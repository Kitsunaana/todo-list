import { ContextMenuPopup } from "@shared/ui/context-menu"
import { ContextMenuButton } from "@shared/ui/context-menu-button"
import { Divider, Flex, Typography } from "antd"
import { forwardRef } from "react"

const { Text } = Typography

interface ContextMenuPopupProps {
  id: number
  close: () => void
  onEdit: (id: number) => void
}

export const TodoContextMenu = forwardRef<HTMLDivElement, ContextMenuPopupProps>((props, ref) => {
  const { id, close, onEdit } = props

  return (
    <ContextMenuPopup
      ref={ref}
      onClick={event => {
        event.stopPropagation()
        close()
      }}
    >
      <Flex style={{ padding: "4px 8px" }}>
        <ContextMenuButton 
          iconName="edit" 
          text="Редактировать" 
          iconColor="#2196f3"
          onClick={() => onEdit(id)}
        />
      </Flex>
      <Divider style={{ margin: 0 }} />
      <Flex vertical gap={8} style={{ padding: "4px 8px" }}>
        <ContextMenuButton 
          iconName="remove" 
          text="Удалить" 
          iconColor="#f44336" 
        />
        <ContextMenuButton 
          iconName="addFavorite" 
          text="Добавить в избранное" 
          iconColor="#ff4081" 
        />
        <ContextMenuButton 
          iconName="doDone" 
          text="Выполнить" 
          iconColor="#4caf50" 
        />
      </Flex>
      <Divider style={{ margin: 0 }} />
      <Flex vertical gap={8} align="center">
        <Text>ID {id}</Text>
      </Flex>
    </ContextMenuPopup>
  )
})