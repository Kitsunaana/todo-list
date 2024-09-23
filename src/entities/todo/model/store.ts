import {makeAutoObservable, reaction} from "mobx";
import {MobxQuery} from "../../../shared/lib/mobx-react-query.ts";
import {todosApi} from "../../../shared/api/todos-api.ts";
import {queryClient} from "../../../shared/config/query-client.ts";
import {Key, TodoPreviewSettings, Value} from "./types.ts";

const initialSettings: TodoPreviewSettings = {
  isShowHatch: false
}

class TodosStore {
  settings = initialSettings
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
    queryFn: todosApi.getAll,
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

    return this.todos.data.filter(todo => (
      todo.description.toUpperCase().includes(this.search.toUpperCase())
    ))
  }

  onChangePreviewSettings(key: Key, value: Value) {
    this.settings[key] = value
  }
}

export const createTodosStore = () => new TodosStore()
export const todosStore = createTodosStore()
