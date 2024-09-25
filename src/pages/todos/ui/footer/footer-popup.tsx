import { todosStore } from "@entities/todo"
import { Button, Flex } from "antd"
import { observer } from "mobx-react-lite"

export const FooterPopup = observer(() => {
  const ExpandAllTasksButton = (
    <Button
      onClick={() => {
        if (todosStore.expandedLength > 0) todosStore.onCollapseAll()
        else todosStore.onExpandAll()
      }}
    >
      {todosStore.expandedLength > 0 
        ? "Свернуть все задачи" 
        : "Развернуть все задачи"
      }
    </Button>
  )

  if (todosStore.isShowSelected) {
    const selectedTodosIsEmpty = todosStore.selectedLength === 0

    return (
      <Flex vertical gap={8}>
        {selectedTodosIsEmpty && (
          <Button onClick={todosStore.onSelectAll}>
            Выделить все
          </Button>
        )}
        {!selectedTodosIsEmpty && (
          <Button onClick={todosStore.onRemoveSeleted}>
            Снять выделенное
          </Button>
        )}
        {selectedTodosIsEmpty && (
          <Button onClick={todosStore.onToggleShowSeleted}>
            Скрыть выделения
          </Button>
        )}
        {ExpandAllTasksButton}
      </Flex>
    )
  }

  return (
    <Flex vertical gap={8}>
      <Button onClick={todosStore.onToggleShowSeleted}>
        Показать выделения
      </Button>
      {ExpandAllTasksButton}
    </Flex>
  )
})