import { TodoDto } from "@shared/types";
import { makeAutoObservable, reaction } from "mobx";
import queryString from "query-string";
import { LOCAL_STORAGE_FAVORITES_KEY, LOCAL_STORAGE_KEYS, LOCAL_STORAGE_SETTINGS_KEY } from "./const";
import { Key, TodoPreviewSettings, Value } from "./types";

const initialSettings: TodoPreviewSettings = {
  isShowHatch: false,
  isShowStatus: false
}

class TodosStore {
  selected: Record<number, boolean> = {}
  expanded: Record<number, boolean> = {}
  favorites: number[] = []
  todos: TodoDto.Todo[] = []

  filter = "all"
  search = ""
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

  setTodos(todos: TodoDto.Todo[]) {
    this.todos = todos
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

  onChangeFilter(filter: TodoDto.Filters = "all", saveToPath: boolean = true) {
    this.filter = filter

    if (filter === "favorite") {
      this.queryParams = this.favorites.map((favorite) => `filters[id]=${favorite}`).join("&")
    } else if (filter !== "all") {
      this.queryParams = `filters[status]=${filter}`
    } else {
      this.queryParams = ""
    }

    if (saveToPath) {
      const params = queryString.stringify({ ...queryString.parseUrl(window.location.href).query, filter });

      window.history.pushState({}, "", `${window.location.href.split("?")[0]}?${params}`)
    }
  }

  onChangeSearch(value: string, saveToPath: boolean = true) {
    this.search = value.trim()

    if (saveToPath) {
      const params = queryString.stringify({ ...queryString.parseUrl(window.location.href).query, search: value });

      window.history.pushState({}, "", `${window.location.href.split("?")[0]}?${params}`)
    }
  }

  onToggleFavorite(id: number) {
    this.favorites = this.favorites.includes(id)
      ? this.favorites.filter(todoId => todoId !== id)
      : this.favorites.concat([id])

    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(this.favorites))
  }

  hasFavorites(id: number) {
    return this.favorites.includes(id)
  }

  get selectedTodos() {
    return this.filteredTodos.filter(todo => {
      if (Object.keys(this.selected).map(Number).includes(todo.id)) return todo
      return null
    })
  }

  get filteredTodos() {
    if (this.search === "") return this.todos

    return this.todos.filter(todo => (
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
