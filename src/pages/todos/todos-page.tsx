import {Button, Checkbox, Collapse, CollapseProps, Flex, Input, Select, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer";
import {Header} from "./ui/header/header";
import {todosStore, backgroundStyles} from "@entities/todo";
import {Table} from "@shared/ui/table";
import { UpsertDialog } from "@shared/ui/upsert-dialog";
import { IconButton } from "@shared/ui/icon-button";
import styled from "styled-components";
import { useContextMenu } from "@shared/hooks/use-context-menu";
import { Icon } from "@shared/ui/icon";

const { Text } = Typography;

export interface FormFields {
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
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

  const onChangeCollapse = (key: string | string[]) => {
    todosStore.onChangeCollapse(Array.isArray(key) ? key : [key])
  };

  const TodoItem = (props: { id: number, description: string }) => {
    const { id, description } = props

    const menu = useContextMenu()

    return (
      <Flex 
        key={id} 
        align="center" 
        justify="space-between" 
        onContextMenu={(event) => menu.open(event)} 
        style={{ padding: "6px 8px" }}
      >
        {menu.isOpen && (
          <div 
            ref={menu.ref}
            style={{ 
              position: "absolute", 
              padding: 40, 
              backgroundColor: "red", 
              zIndex: 1000000,
            }} 
          >
            <Button icon={<Icon name="reload" />} iconPosition={"end"}>
              Search
            </Button>
          </div>
        )}
        <Flex gap={8}>
          {todosStore.isShowSelected && (
            <Checkbox checked={todosStore.selected[id]} onClick={(event) => {
              event.stopPropagation()
              todosStore.onToggleSelected(id)
            }} />
          )}
          <Text>{description}</Text>
        </Flex>
        <IconButton name="actions" onClick={(event) => event.stopPropagation()} />
      </Flex>
    )
  }

  const items: CollapseProps["items"] = todosStore.filteredTodos.map((todo) => ({
    key: todo.id,
    label: <TodoItem key={todo.id} description={todo.description} id={todo.id} />,
    children: [<Text key={todo.id}>{todo.publishedAt}</Text>],
    style: {
      ...backgroundStyles[todo.status],
      ...(!todosStore.settings.isShowHatch ? {} : {
        backgroundImage: "unset"
      })
    },
  }))

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

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

      <UpsertDialog
        content={(
          <Flex vertical gap={8}>
            <Input placeholder="Название задачи" />

            <Input placeholder="Описание" />

            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={onChangeSelect}
              onSearch={onSearch}
              defaultValue={"open"}
              disabled
              options={[
                {
                  value: 'open',
                  label: 'Создано',
                },
                {
                  value: 'working',
                  label: 'В работе',
                },
                {
                  value: 'done',
                  label: 'Выполнено',
                },
              ]}
            />
          </Flex>
        )}
      />
    </>
  )
})

export default TodosPage
