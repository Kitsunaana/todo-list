import { todosStore } from "@entities/todo"
import { Icon } from "@shared/ui/icon"
import { Button, Flex, Popover } from "antd"
import { observer } from "mobx-react-lite"
import { useState } from "react"


const SelectOptions = observer(() => {
  const ExpandAllTasksButton = (
    <Button onClick={() => {
      if (Object.keys(todosStore.expanded).length > 0) todosStore.onCollapseAll()
      else todosStore.onExpandAll()
    }}>
      {Object.keys(todosStore.expanded).length > 0 ? "Свернуть все задачи" : "Развернуть все задачи"}
    </Button>
  )

  if (todosStore.isShowSelected) {
    return (
      <Flex vertical gap={8}>
        {Object.keys(todosStore.selected).length === 0 && (
          <Button onClick={() => todosStore.onSelectAll()}>
            Выделить все
          </Button>
        )}
        {Object.keys(todosStore.selected).length > 0 && (
          <Button onClick={() => todosStore.onRemoveSeleted()}>
            Снять выделенное
          </Button>
        )}
        {Object.keys(todosStore.selected).length === 0 && (
          <Button 
            onClick={() => {
              todosStore.onToggleShowSeleted()
            }}
          >
            Скрыть выделения
          </Button>
        )}
        {ExpandAllTasksButton}
      </Flex>
    )
  }

  return (
    <Flex vertical gap={8}>
      <Button 
        onClick={() => {
          todosStore.onToggleShowSeleted()
        }}
      >
        Показать выделения
      </Button>
      {ExpandAllTasksButton}
    </Flex>
  )
})

export const Footer = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div
      style={{
        paddingTop: 8,
        display: "flex",
        flexFlow: "row",
        gap: 8,
        alignItems: "center",
        margin: "auto 0px 0px",
      }}
    >
      <Popover 
        trigger="click" 
        placement="topLeft" 
        content={<SelectOptions />} 
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Button
          type="text"
          icon={<Icon name="selected" />}
        />
      </Popover>
    </div>
  )
}
