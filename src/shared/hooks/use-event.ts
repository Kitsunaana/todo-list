import { useEffect } from "react"

export const useEvent = <Key extends keyof HTMLElementEventMap>(
  name: Key,
  handler: (event: HTMLElementEventMap[Key]) => void,
  shouldHandle: (() => boolean) | boolean = true,
  target: (() => EventTarget) | EventTarget = document
) => {
  useEffect(() => {
    const handle = shouldHandle instanceof Function ? shouldHandle() : shouldHandle
    if (!handle) return

    const node = target instanceof Function ? target() : target

    const eventListener: EventListener = (event: Event) => {
      handler(event as HTMLElementEventMap[Key])
    }

    node.addEventListener(name, eventListener)

    return () => node.removeEventListener(name, eventListener)
  })
}