import {Collapse, CollapseProps, Divider, Flex, Input, Popover, Space, Switch} from 'antd';
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import { observer } from "mobx-react-lite"
import {IconButton} from "./shared/ui/icon-button.tsx";
import {TodoItem} from "./entities/ui/todo-item.tsx";
import {todosStore} from "./entities";
import { Typography } from 'antd';
import styled from 'styled-components';
import { Types } from "./entities";
import * as React from "react";

const { Text } = Typography;

interface FormFields {
  search: string
}

export const PreviewSettingsDivider = styled(Divider)`
  margin: 4px 0px !important;
  border-color: #575555 !important;

  span {
    font-weight: 400;
  }

`

export const TodoPreviewSettings = observer(() => {
  return (
    <div style={{ minWidth: 250 }}>
      <PreviewSettingsDivider>Скрыть из заголовка</PreviewSettingsDivider>
      <Flex vertical gap={4}>
        {Object.entries(todosStore.settings).map(([key, value]) => (
          <Flex gap={8} align="center" key={key}>
            <Switch
              value={value}
              onChange={(checked) => (
                todosStore.onChangePreviewSettings(
                  key as Types.Key,
                  checked as Types.Value
                )
              )}
            />
            <Text style={{ fontSize: 16 }}>{key}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  )
})

export const App = observer(() => {
  const [isFocused, setIsFocused] = useState(false);
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

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

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items = todosStore.filteredTodos.map((todo): CollapseProps['items'][number] => ({
    key: todo.id,
    label: todo.description,
    children: (
      <Text>{todo.publishedAt}</Text>
    )
  }))

  return (
    <>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Flex gap={4}>
          <Controller
            name="search"
            control={methods.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Поиск"
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
              />
            )}
          />

          <Popover
            placement="bottomRight"
            content={(
              <TodoPreviewSettings />
            )}
            trigger="click"
          >
            <IconButton
              name="settings"
              color="#616161"
              fontSize={22}
            />
          </Popover>

          <IconButton
            name="add"
            fontSize={22}
            color="#66bb6a"
          />

          <IconButton
            name="reload"
            fontSize={22}
            color="#fb8c00"
            onClick={() => todosStore.todosResult.refetch()}
          />

        </Flex>

        <Collapse
          expandIconPosition="right"
          onChange={onChange}
        >
          {items.map((item) => {
            const findTodo = todosStore.getTodoById(item.key as number)

            return (
              <TodoItem
                key={item.key as number}
                isShowHatch={todosStore.settings.isShowHatch}
                header={(
                  <Flex
                    wrap
                    align="center"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <div>{findTodo.description}</div>
                    <IconButton
                      name="actions"
                      color="#1e88e5"
                      fontSize={22}
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    />
                  </Flex>
                )}
                status={findTodo.status ?? "working"}
              >
                {item.children}
              </TodoItem>
            )
          })}
        </Collapse>
      </Space>
    </>
  )
})
