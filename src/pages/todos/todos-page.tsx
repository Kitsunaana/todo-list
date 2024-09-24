import {Collapse, CollapseProps, Flex, Input, message, Select, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {Controller, FormProvider, useForm, useFormContext} from "react-hook-form";
import {Footer} from "./ui/footer/footer";
import {Header} from "./ui/header/header";
import {todosStore, backgroundStyles, TodoItem} from "@entities/todo";
import {Table} from "@shared/ui/table";
import { UpsertDialog } from "@shared/ui/upsert-dialog";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"
import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";

const { Text } = Typography;
const { TextArea } = Input

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

export interface CreateTodoFormFields {
  name: string
  description: string
  status: string
}

interface CreateTodoFormProps {
  isLoading: boolean
}

const CreateTodoForm = (props: CreateTodoFormProps) => {
  const { isLoading } = props

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const methods = useFormContext<CreateTodoFormFields>()

  return (
    <Flex vertical gap={8}>
      <Controller
        control={methods.control}
        name="name"
        render={({ field }) => (
          <Input 
            {...field} 
            placeholder="Название задачи"
            allowClear={true}
            disabled={isLoading}
          />
        )}
      />

      <Controller 
        control={methods.control}
        name="description"
        rules={{
          required: { value: true, message: "Поле обязательно для заполнения" }, 
          minLength: { 
            value: 3, 
            message: "Минимальная длина 3 символа" 
          }, 
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <TextArea
              {...field}
              status={error ? "warning" : ""} 
              placeholder="Описание"
              allowClear={true}
              style={{ height: 120, resize: 'none' }}
              disabled={isLoading}
            />
            <Text style={{ color: "#faad14" }}>{error?.message}</Text>
          </div>
        )}
      />

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
  )
}

const todosApi = {
  createTodo: async (data: CreateTodoFormFields) => {
    return new Promise<{ message: string }>((resolve, reject) => {
      setTimeout(() => {
        console.log("Todo creatd", data);
    
        resolve({ message: "Todo success created!" })
        // reject(new Error("Failed to create"))
      }, 3000)
    })
  }
}

const useCreateTodo = () => {
  const { onClose } = useUpsertDialog()

  const { mutate, isPending } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (data: CreateTodoFormFields) => toast.promise<{message: string}, Error>(todosApi.createTodo(data), {
      pending: { render() { return "Идет создание задачи" } },
      success: { render({ data }) { return data.message } },
      error: { render({ data }) { return data.message } }
    }),
    onSuccess: onClose,
  })

  return { onCreateTodo: mutate, isLoadingCreate: isPending }
}

const CreateTodoDialog = () => {
  const { onCreateTodo, isLoadingCreate } = useCreateTodo()

  const methods = useForm<CreateTodoFormFields>({
    defaultValues: {
      description: "",
      name: "",
      status: "open"
    }
  })
  
  return (
    <FormProvider {...methods}>
      <UpsertDialog
        isLoading={isLoadingCreate}
        onCreate={onCreateTodo}
        content={<CreateTodoForm isLoading={isLoadingCreate} />}
      />
    </FormProvider>
  )
}

const TodosPage = observer(() => {
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

  const onChangeCollapse = (key: string | string[]) => {
    todosStore.onChangeCollapse(Array.isArray(key) ? key : [key])
  };

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
    </>
  )
})

export default TodosPage
