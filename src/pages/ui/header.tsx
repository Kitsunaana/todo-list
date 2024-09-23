import {Controller, useForm} from "react-hook-form";
import {Button, Flex, Input, Popover} from "antd";
import {Icon} from "../../shared/ui/icon.tsx";
import {IconButton} from "../../shared/ui/icon-button.tsx";
import {todosStore} from "../../entities";
import * as React from "react";
import {FormFields, TodoPreviewSettings} from "../../App.tsx";
import {useEffect, useState} from "react";

export const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const methods = useForm<FormFields>()

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

      <Popover
        content={(
          <TodoPreviewSettings/>
        )}
        trigger="click"
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<Icon name="settings" fontSize={20} color="#616161"/>}
        />
      </Popover>

      <IconButton
        name="add"
        fontSize={20}
        color="#66bb6a"
      />

      <IconButton
        name="reload"
        fontSize={20}
        color="#fb8c00"
        onClick={() => todosStore.todosResult.refetch()}
      />
    </Flex>
  )
}
