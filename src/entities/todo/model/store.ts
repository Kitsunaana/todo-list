import { makeAutoObservable, reaction } from "mobx";
import { Key, TodoPreviewSettings, Value } from "./types";
import { MobxQuery } from "@shared/lib/mobx-react-query";
import { todosApi } from "@shared/api/todos-api";
import { queryClient } from "@shared/config/query-client";
import { TodoDto } from "@shared/types";
import { LOCAL_STORAGE_FAVORITES_KEY, LOCAL_STORAGE_KEYS, LOCAL_STORAGE_SETTINGS_KEY } from "./const";

const initialSettings: TodoPreviewSettings = {
  isShowHatch: false
}

class TodosStore {
  selected: Record<number, boolean> = {}
  expanded: Record<number, boolean> = {}
  favorites: number[] = [0]

  search = ""
  filter = "all"
  queryParams = ""

  isShowSelected = false
  settings = initialSettings


  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    reaction(
      () => this.search,
      () => this.filteredTodos
    )

    this.setInitialData()
  }

  setInitialData() {
    LOCAL_STORAGE_KEYS.forEach(storageKey => {
      const readData = localStorage.getItem(storageKey)

      if (readData !== null) {
        const property = storageKey.split("-")[2] as string
        const parsedData = JSON.parse(readData)

        if (typeof this[property] === "object" && !Array.isArray(this[property])) {
          this[property] = { ...this[property], ...parsedData }
        } else if (Array.isArray(this[property])) {
          this[property] = [...this[property], ...parsedData]
        } else {
          this[property] = parsedData
        }
      }
    })
  }

  todosQuery = new MobxQuery(() => ({
    queryKey: ["todos", this.queryParams],
    queryFn: () => todosApi.getAll(this.queryParams),
  }), queryClient)

  get todos() {
    return this.todosQuery.data
  }

  get todosResult() {
    return this.todosQuery.result
  }

  onChangeFilter(filter: TodoDto.Filters) {
    this.filter = filter
    let result = ""

    if (filter === "favorite") {
      result = this.favorites.map((favorite) => `filters[id]=${favorite}`).join("&")
    } else if (filter !== "all") {
      result = `filters[status]=${filter}`
    }

    this.queryParams = `${URL}?${result}`
  }

  changeSearch(value: string) {
    if (this.search === value) return
    this.search = value.trim()
  }

  onToggleFavorite(id: number) {
    this.favorites = this.favorites.includes(id)
      ? this.favorites.filter(todoId => todoId !== id)
      : this.favorites.concat([id])

    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(this.favorites))
  }

  get filteredTodos() {
    if (this.search === "") return this.todosQuery.data.data

    return this.todos.data.filter(todo => (
      todo.description.toUpperCase().includes(this.search.toUpperCase())
    ))
  }

  get expandedLength() {
    return Object.keys(this.expanded).length
  }

  get selectedLength() {
    return Object.keys(this.selected).length
  }

  onChangePreviewSettings(key: Key, value: Value) {
    this.settings[key] = value

    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(this.settings))
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
