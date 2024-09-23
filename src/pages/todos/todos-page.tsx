import {Collapse, CollapseProps, Flex, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {FormProvider, useForm} from "react-hook-form";
import {Footer} from "./ui/footer/footer.tsx";
import {Header} from "./ui/header/header.tsx";
import {Table} from "../../shared/ui/table.tsx";
import {backgroundStyles, todosStore} from "../../entities/todo";

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
      <Flex>
        <Text key={todo.id}>{todo.publishedAt}</Text>
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
