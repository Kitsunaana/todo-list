import {Button, Collapse, CollapseProps, Empty, Result, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer";
import {Header} from "./ui/header/header";
import {todosStore, backgroundStyles, TodoItem} from "@entities/todo";
import {Table} from "@shared/ui/table";
import styled from "styled-components";
import { CreateTodoDialog, EditTodoDialog, useRemoveTodo } from "@features/todo";
import { Loader } from "@shared/ui/loader";
import { Mark } from "@shared/ui/mark";
import { formattedDate } from "@shared/lib/date";
import { useInfiniteQueryTodos } from "@entities/todo/queries/use-infinite-todos";

const { Text } = Typography;

export interface FilterFormFields {
  search: string
}

const CustomCollapse = styled(Collapse)`
  overflow: hidden auto;
  display: flex;
  flex-direction: column;

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
  const methods = useForm<FilterFormFields>({
    defaultValues: { search: "" }
  })

  const onChangeCollapse = (key: string | string[]) => {
    todosStore.onChangeCollapse(Array.isArray(key) ? key : [key])
  };

  const { isError, isLoading, lastElementRef, refetch } = useInfiniteQueryTodos()

  let items: CollapseProps["items"]  = []

  if (!isLoading && !isError) {
    items = todosStore.filteredTodos.map((todo) => ({
      key: todo.id,
      label: (
        <TodoItem
          ref={lastElementRef}
          key={todo.id}
          description={todo.description}
          id={todo.id}
          onRemove={onRemove}
        />
      ),
      children: [(
        <Text key={todo.id}>
          Дата публикации задачи: <Mark>{formattedDate(todo.publishedAt)}</Mark>
        </Text>
      )],
      style: {
        ...backgroundStyles[todo.status],
        ...(!todosStore.settings.isShowHatch ? {} : {
          backgroundImage: "unset"
        })
      },
    }))
  }

  const renderContent = () => {
    if (isLoading) return <Loader />
    if (isError) {
      return (
        <Result
          status="warning"
          title="Похоже произошла ошибка при загрузке данных"
          extra={
            <Button 
              onClick={() => refetch()} 
              type="primary" 
            >
              Загрузить снова
            </Button>
          }
        />
      )
    }
    if (todosStore.filteredTodos.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
  }

  return (
    <>
      <Table
        header={(
          <FormProvider {...methods}>
            <Header />
          </FormProvider>
        )}
        content={todosStore.filteredTodos.length === 0 ? (renderContent()) : (
          (<CustomCollapse
            defaultActiveKey={Object.keys(todosStore.expanded)}
            activeKey={Object.keys(todosStore.expanded)}
            expandIconPosition="end"
            onChange={onChangeCollapse}
            items={items}
          />)
        )}
        footer={<Footer />}
      />

      <CreateTodoDialog />
      <EditTodoDialog />
    </>
  )
})

export default TodosPage
