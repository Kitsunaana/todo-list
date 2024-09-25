import { todosApi } from "@shared/api/todos-api"
import { TodoDto } from "@shared/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { todosStore } from "../model/store"

export const useInfiniteQueryTodos = () => {
  const observer = useRef<IntersectionObserver>()

  const { data, isLoading, isError, refetch, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["todos", todosStore.filter],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => todosApi.getAll(todosStore.queryParams, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data?.length ? allPages.length + 1 : undefined
    },
  })

  const todos: TodoDto.GetTodosResponse["data"] = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page.data]
    }, [] as TodoDto.GetTodosResponse["data"]) ?? []
  }, [data])

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) fetchNextPage()
    })

    if (node) observer.current.observe(node)
  }, [fetchNextPage, hasNextPage, isFetching, isLoading])

  useEffect(() => { todosStore.setTodos(todos) }, [todos])

  return {
    isLoading,
    isError,
    refetch,
    lastElementRef,
  }
}