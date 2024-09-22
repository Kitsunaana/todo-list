import { createAtom, makeAutoObservable, reaction } from "mobx"
import {
  DefaultError, QueryKey, QueryObserver, QueryObserverOptions, QueryClient,
} from "@tanstack/query-core"

export class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> {
  private atom = createAtom(
    "MobxQuery",
    () => this.startTracking(),
    () => this.stopTracking(),
  )

  private queryObserver = new QueryObserver(
    this.queryClient,
    this.defaultQueryOptions,
  )

  constructor(
    private getOptions: () => (QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>),
    private queryClient: QueryClient,
  ) {
    makeAutoObservable(this)
  }

  get result() {
    this.atom.reportObserved()
    this.queryObserver.setOptions(this.defaultQueryOptions)

    return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
  }

  get data(): TData {
    const { data } = this.result

    if (!data) throw this.queryObserver.fetchOptimistic(this.defaultQueryOptions)

    return data
  }

  private unsubscribe = () => { }
  private startTracking() {
    const unsubscribeReaction = reaction(
      () => this.defaultQueryOptions,
      () => this.queryObserver.setOptions(this.defaultQueryOptions),
    )

    const unsubscribeObserver = this.queryObserver.subscribe(() => {
      this.atom.reportChanged()
    })

    this.unsubscribe = () => {
      unsubscribeObserver()
      unsubscribeReaction()
    }
  }

  private stopTracking() {
    this.unsubscribe()
  }

  private get defaultQueryOptions() {
    return this.queryClient.defaultQueryOptions(this.getOptions())
  }
}