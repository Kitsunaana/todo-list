import { makeAutoObservable, reaction } from "mobx";
import { Key, TodoPreviewSettings, Value } from "./types";
import { MobxQuery } from "@shared/lib/mobx-react-query";
import { todosApi } from "@shared/api/todos-api";
import { queryClient } from "@shared/config/query-client";

const initialSettings: TodoPreviewSettings = {
  isShowHatch: false
}

class TodosStore {
  selected: Record<number, boolean> = {}
  expanded: Record<number, boolean> = { 2: true, 5: true }

  isShowSelected = false
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

  onToggleShowSeleted() {
    this.isShowSelected = !this.isShowSelected
  }

  onToggleSelected(id: number) {
    if (this.selected[id]) delete this.selected[id]
    else this.selected[id] = true
  }

  onSelectAll() {
    this.filteredTodos.forEach(todo => {
      this.selected[todo.id] = true
    })
  }

  onRemoveSeleted() {
    Object.keys(this.selected).forEach(todoId => (
      delete this.selected[todoId]
    ))
  }

  onChangeCollapse(todoIds: string[]) {
    this.expanded = {}

    todoIds.forEach(todoId => {
      this.expanded[todoId] = true
    })
  }

  onExpandAll() {
    this.filteredTodos.forEach(todo => {
      this.expanded[todo.id] = true
    })
  }

  onCollapseAll() {
    this.filteredTodos.forEach(todo => {
      delete this.expanded[todo.id]
    })
  }
}

export const createTodosStore = () => new TodosStore()
export const todosStore = createTodosStore()
