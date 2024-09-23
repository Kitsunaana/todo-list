import {Collapse, CollapseProps, Divider, Flex, Switch} from 'antd';
import {FormProvider, useForm} from "react-hook-form";
import { observer } from "mobx-react-lite"
import {todosStore} from "./entities";
import { Typography } from 'antd';
import styled, {css} from 'styled-components';
import { Types } from "./entities";
import { TodoDto } from "./shared/types"
import {Footer} from "./pages/ui/footer.tsx";
import {Header} from "./pages/ui/header.tsx";
import {Table} from "./shared/ui/table.tsx";
import {IconButton} from "./shared/ui/icon-button.tsx";
import {backgroundStyles, TodoItem} from "./entities/ui/todo-item.tsx";
import {useMemo} from "react";

const { Text } = Typography;

export interface FormFields {
  search: string
}

export const PreviewSettingsDivider = styled(Divider)`
  margin: 4px 0px !important;
  border-color: #575555 !important;

  span {
    font-weight: 400;
  }

`

const labels: Record<Types.Key, string> = {
  isShowHatch: "Штриховку"
}

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
            <Text style={{ fontSize: 16 }}>{labels[key as Types.Key]}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  )
})

export const App = observer(() => {
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items = todosStore.filteredTodos.map((todo): CollapseProps['items'][number] => ({
    key: todo.id,
    label: todo.description,
    children: (
      <Text>{todo.publishedAt}</Text>
    ),
    style: {
      ...backgroundStyles[todo.status],
      ...(todosStore.settings.isShowHatch ? {} : {
        backgroundImage: "unset"
      })
    }
  }))

  return (
    <Table
      header={(
        <FormProvider {...methods}>
          <Header />
        </FormProvider>
      )}
      content={(
        <Collapse
          expandIconPosition="end"
          onChange={onChange}
          items={items}
          style={{
            overflow: "hidden auto",
            display: "flex",
            flexFlow: "column",
            WebkitBoxFlex: 1,
          }}
        />
      )}
      footer={<Footer />}
    />
  )
})

{/*<Collapse
            expandIconPosition="right"
            onChange={onChange}
          >
            {mockItems.map((item) => {
              // const findTodo = todosStore.getTodoById(item.key as number)

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
                      <div>{"findTodo.description"}</div>
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
                  // status={findTodo.status ?? "working"}
                  status={"done"}
                >
                  {item.children}
                </TodoItem>
              )
            })}
          </Collapse>*/
}
