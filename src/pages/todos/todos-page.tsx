import {Collapse, CollapseProps, Flex, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer.tsx";
import {Header} from "./ui/header/header.tsx";
import {todosStore, backgroundStyles} from "entities/todo";
import {Table} from "shared/ui/table.tsx";

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

export default TodosPage
