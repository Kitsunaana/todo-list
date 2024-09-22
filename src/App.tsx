import {Input, InputRef, List, Space} from 'antd';
import {todosApi} from "./shared/api/todos-api.ts";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import {makeAutoObservable, reaction} from "mobx";
import { MobxQuery } from "./shared/lib/mobx-react-query.ts";
import { queryClient } from "./shared/config/query-client.ts";
import { observer } from "mobx-react-lite"
import {Todo} from "./shared/types/todos/types.ts";

interface FormFields {
  search: string
}

class TodosStore {
  search = ""

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.search,
      () => this.filteredTodos
    )
  }

  todosQuery = new MobxQuery(() => ({
    queryKey: ["todos"],
    queryFn: todosApi.getAll
  }), queryClient)

  get todos() {
    return this.todosQuery.data
  }

  get todosResult() {
    return this.todosQuery.result
  }

  changeSearch(value: string) {
    if (this.search === value) return

    this.search = value.trim()
  }

  get filteredTodos() {
    if (this.search === "") return this.todosQuery.data.data

    return this.todos.data.filter(todo => {
      return todo.description.toUpperCase().includes(this.search.toUpperCase())
    })
  }
}

export const createTodosStore = () => new TodosStore()
const todosStore = createTodosStore()

const backgroundStyles = {
  working: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #ab47bc 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #ab47bc"
  },
  done: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #9ccc65 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #9ccc65"
  },
  open: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #26c6da 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #26c6da"
  }
}

export const App = observer(() => {
  const [isFocused, setIsFocused] = useState(false);
  const methods = useForm<FormFields>({
    defaultValues: { search: "" }
  })

  useEffect(() => {
    const cbEvent = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isFocused) {
        methods.handleSubmit((data) => {
          todosStore.changeSearch(data.search)
        })()
      }
    }

    window.addEventListener("keydown", cbEvent)

    return () => window.removeEventListener("keydown", cbEvent)
  }, [isFocused, methods]);

  return (
    <>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Controller
          name="search"
          control={methods.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Поиск"
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
            />
          )}
        />

        <List
          size="small"
          dataSource={todosStore.filteredTodos}
          renderItem={(item: Todo) => (
            <List.Item
              style={{
                border: "1px solid #ccc",
                ...backgroundStyles[item.status],
              }}
            >
              {item.description}
            </List.Item>
          )}
        />
      </Space>
    </>
  )
})
