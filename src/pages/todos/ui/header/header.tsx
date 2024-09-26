import { todosStore } from "@entities/todo";
import { useEditTodos, useRemoveTodos } from "@features/todo";
import { FilterFormFields } from "@pages/todos/todos-page";
import { useEvent } from "@shared/hooks/use-event";
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";
import { Icon } from "@shared/ui/icon";
import { IconButton } from "@shared/ui/icon-button";
import { Button, Flex, Input, Popover } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FilterPopup } from "./filter";
import { TodoPreviewSettings } from "./settings";

export const Header = observer(() => {
  const onRemove = useRemoveTodos()
  const onChangeStatus = useEditTodos()
  const navigate = useNavigate()

  const [isFocused, setIsFocused] = useState(false);
  const methods = useFormContext<FilterFormFields>()
  const { onOpen } = useUpsertDialog()

  const handleRemoveTodos = () => {
    const description = "Вы уверены, что хотите удалить все выбранные задачи?"

    onRemove(Object.keys(todosStore.selected).filter(Boolean).map(Number), description)
  }

  useEvent("keydown", (event) => {
    if (event.key === "Enter" && isFocused) {
      methods.handleSubmit((data) => {
        todosStore.onChangeSearch(data.search)
      })()
    }
  })

  return (
    <Flex style={{marginBottom: 8}}>
      <Controller
        name="search"
        control={methods.control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Поиск"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            style={{marginRight: 4}}
          />
        )}
      />

      <Popover
        content={<FilterPopup />}
        trigger="click"
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<Icon name="filter" color="#ffa726"/>}
        />
      </Popover>

      <Popover
        content={<TodoPreviewSettings />}
        trigger="click"
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<Icon name="settings" color="#616161"/>}
        />
      </Popover>

      {todosStore.selectedLength > 0 && (
        <IconButton
          name="allDone"
          color="#2196f3"
          onClick={() => onChangeStatus(todosStore.selectedTodos)}
        />
      )}

      {todosStore.selectedLength > 0 && (
        <IconButton
          onClick={handleRemoveTodos}
          name="remove"
          color="#e53935"
        />
      )}

      <IconButton
        name="add"
        color="#66bb6a"
        onClick={() => onOpen()}
      />

      <IconButton 
        name="undo"
        onClick={() => navigate(-1)}
      />

      <IconButton 
        name="redo"
        onClick={() => navigate(+1)}
      />
    </Flex>
  )
})
