import {Collapse, CollapseProps, Flex, Input, Select, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer";
import {Header} from "./ui/header/header";
import {todosStore, backgroundStyles} from "@entities/todo";
import {Table} from "@shared/ui/table";
import { UpsertDialog } from "@shared/ui/upsert-dialog";

const { Text } = Typography;

export interface FormFields {
  search: string
}

const TodosPage = observer(() => {
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items: CollapseProps["items"] = todosStore.filteredTodos.map((todo) => ({
    key: todo.id,
    label: todo.description,
    children: [(
      <Flex key={todo.id}>
        <Text>{todo.publishedAt}</Text>
      </Flex>
    )],
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
