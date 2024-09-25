import {Collapse, CollapseProps, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer";
import {Header} from "./ui/header/header";
import {todosStore, backgroundStyles, TodoItem} from "@entities/todo";
import {Table} from "@shared/ui/table";
import styled from "styled-components";
import { CreateTodoDialog, EditTodoDialog, useRemoveTodo } from "@features/todo";

const { Text } = Typography;

export interface SearchFormFields {
  search: string
}

const CustomCollapse = styled(Collapse)`
  && .ant-collapse-header {
    display: flex;
    align-items: center;
    position: unset;
    padding: 0px 8px 0px 0px;
  }

  && .ant-collapse-expand-icon {
    padding-inline-start: 4px !important;
  }
`

const TodosPage = observer(() => {
  const onRemove = useRemoveTodo()

  const methods = useForm<SearchFormFields>({
    defaultValues: { search: "" }
  })

  const onChangeCollapse = (key: string | string[]) => {
    todosStore.onChangeCollapse(Array.isArray(key) ? key : [key])
  };

  const items: CollapseProps["items"] = todosStore.filteredTodos.map((todo) => ({
    key: todo.id,
    label: (
      <TodoItem
        key={todo.id}
        description={todo.description}
        id={todo.id}
        onRemove={onRemove}
      />
    ),
    children: [<Text key={todo.id}>{todo.publishedAt}</Text>],
    style: {
      ...backgroundStyles[todo.status],
      ...(!todosStore.settings.isShowHatch ? {} : {
        backgroundImage: "unset"
      })
    },
  }))

  return (
    <>
      <Table
        header={(
          <FormProvider {...methods}>
            <Header />
          </FormProvider>
        )}
        content={(
          <CustomCollapse
            defaultActiveKey={Object.keys(todosStore.expanded)}
            activeKey={Object.keys(todosStore.expanded)}
            expandIconPosition="end"
            onChange={onChangeCollapse}
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

      <CreateTodoDialog />
      <EditTodoDialog />
    </>
  )
})

export default TodosPage
