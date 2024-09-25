import { Flex, Input, Select, Typography } from "antd"
import { Controller, useFormContext } from "react-hook-form"
import { CreateTodoFormFields } from "../types/types";

const { Text } = Typography;
const { TextArea } = Input

interface EditTodoFormProps {
  isLoading: boolean
}

export const EditTodoForm = (props: EditTodoFormProps) => {
  const { isLoading } = props

  const methods = useFormContext<CreateTodoFormFields>()

  return (
    <Flex vertical gap={8}>
      <Controller
        control={methods.control}
        name="name"
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
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

      <Controller 
        name="status"
        render={({ field }) => (
          <Select
            {...field}
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            defaultValue={"open"}
            disabled={isLoading}
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
        )}
      />
    </Flex>
  )
}