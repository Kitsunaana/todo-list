import { backgroundStyles, TodoItem, todosStore, useInfiniteQueryTodos } from "@entities/todo";
import { CreateTodoDialog, EditTodoDialog, useRemoveTodo } from "@features/todo";
import { useEditTodo } from "@features/todo/queries/use-edit-todo";
import { formattedDate } from "@shared/lib/date";
import { TodoDto } from "@shared/types";
import { Loader } from "@shared/ui/loader";
import { Mark } from "@shared/ui/mark";
import { Table } from "@shared/ui/table";
import { Button, Collapse, CollapseProps, Empty, Result, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "./ui/footer/footer";
import { filters } from "./ui/header/filter";
import { Header } from "./ui/header/header";

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
  const [searchParams, setSearchParams] = useSearchParams()
  
  const onRemove = useRemoveTodo()
  const methods = useForm<FilterFormFields>({
    defaultValues: { search: "" }
  })

  const { isError, isLoading, lastElementRef, refetch } = useInfiniteQueryTodos()
  const { onEditTodo } = useEditTodo()


  useEffect(() => {
    const search = searchParams.get("search")
    const filter = searchParams.get("filter")

    const filterIsValid = (filter: unknown): filter is TodoDto.Filters => (filters as unknown[]).includes(filter)
    const searchIsValid = (search: unknown): search is string => typeof search === "string"

    methods.setValue("search", search ?? "")

    if (searchIsValid(search)) todosStore.onChangeSearch(search, false)
    if (filterIsValid(filter)) todosStore.onChangeFilter(filter, false)
  }, [searchParams])

  const items: CollapseProps["items"] = todosStore
    .filteredTodos
    .map(todo => ({
      key: todo.id,
      label: (
        <TodoItem
          onChangeStatus={() => onEditTodo({ ...todo, status: "done" })}
          key={todo.id}
          ref={lastElementRef}
          id={todo.id}
          status={todo.status}
          description={todo.description}
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

  const onChangeCollapse = (key: string | string[]) => {
    todosStore.onChangeCollapse(Array.isArray(key) ? key : [key])
  };

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
