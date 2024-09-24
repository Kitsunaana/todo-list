import { RefObject } from "react";
import { useEvent } from "./use-event";

export const useClickAway = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  shouldHandle: ((event: MouseEvent) => boolean) | boolean = true
) => {
  useEvent("mousedown", (event) => {
    const handle = shouldHandle instanceof Function ? shouldHandle(event) : shouldHandle

    const target = event.target as Node
    if (handle && !ref.current?.contains(target)) handler()
  })
}
