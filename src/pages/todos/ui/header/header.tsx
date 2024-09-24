import {Controller, useForm} from "react-hook-form";
import {Button, Flex, Input, Popover} from "antd";
import {Icon} from "@shared/ui/icon";
import {IconButton} from "@shared/ui/icon-button";
import {todosStore} from "@entities/todo";
import {useEffect, useState} from "react";
import {TodoPreviewSettings} from "./settings";
import {FormFields} from "../../todos-page";
import { observer } from "mobx-react-lite";
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";

export const Header = observer(() => {
  const [isFocused, setIsFocused] = useState(false);
  const methods = useForm<FormFields>()
  const { onOpen } = useUpsertDialog()

  useEffect(() => {
    const cbEvent = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isFocused) {
        methods.handleSubmit((data) => {
          todosStore.changeSearch(data.search)
        })()
      }
    }

    window.addEventListener("keydown", cbEvent)

    return () => window.removeEventListener("keydown", cbEvent)
  }, [isFocused, methods]);

  return (
    <Flex style={{marginBottom: 8}}>
      <Controller
        name="search"
        control={methods.control}
        render={({field}) => (
          <Input
            {...field}
            placeholder="Поиск"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            style={{marginRight: 4}}
          />
        )}
      />

      {/* <IconButton name="" /> */}

      <Popover
        content={<TodoPreviewSettings />}
        trigger="click"
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<Icon name="settings" fontSize={20} color="#616161"/>}
        />
      </Popover>

      {todosStore.selectedLength > 0 && (
        <IconButton
          name="allDone"
          fontSize={20}
          color="#2196f3"
        />
      )}

      {todosStore.selectedLength > 0 && (
        <IconButton
          name="remove"
          fontSize={20}
          color="#e53935"
        />
      )}

      <IconButton
        name="add"
        fontSize={20}
        color="#66bb6a"
        onClick={() => onOpen()}
      />

      <IconButton
        name="reload"
        fontSize={20}
        color="#fb8c00"
        onClick={() => todosStore.todosResult.refetch()}
      />
    </Flex>
  )
})
