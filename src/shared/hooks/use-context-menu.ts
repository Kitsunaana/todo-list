import React, { useRef, useState } from "react"
import { useContextMenuPosition } from "./use-context-menu-position"
import { useClickAway } from "./use-click-away"
import { useEvent } from "./use-event"

export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const move = useContextMenuPosition(ref, isOpen)

  const open = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()

    move(event.clientX, event.clientY)

    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") close()
  }

  useClickAway(ref, close, isOpen)

  useEvent("keydown", handleEsc)

  return {
    ref,
    open,
    close,
    isOpen,
  }
} 