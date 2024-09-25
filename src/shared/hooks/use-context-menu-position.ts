import { MutableRefObject, useLayoutEffect } from "react"

type Position = {
  x: number | null
  y: number | null
}

const clickPosition: Position = { x: null, y: null }

export const useContextMenuPosition = (
  ref: MutableRefObject<HTMLDivElement | null>,
  isOpen: boolean
) => {
  const updateClickCooridinates = (x: number, y: number) => {
    clickPosition.x = x
    clickPosition.y = y
  }

  const updateVerticalPosition = () => {
    const { y } = clickPosition
    if (!y || !ref.current) return

    const menuHeight = ref.current?.offsetHeight
    const shouldMoveUp = menuHeight > document.body.clientHeight - y

    ref.current.style.top = `${shouldMoveUp ? y - menuHeight : y}px`
    ref.current.classList.add(shouldMoveUp ? "bottom" : "top")
  }

  const updateHorizontalPosition = () => {
    const { x } = clickPosition
    if (!x || !ref.current) return

    const menuWidth = ref.current?.offsetWidth
    const shouldMoveLeft = menuWidth > document.body.clientWidth - x

    ref.current.style.left = `${shouldMoveLeft ? x - menuWidth : x}px`
    ref.current.classList.add(shouldMoveLeft ? "right" : "left")
  }

  const updatePosition = () => {
    updateVerticalPosition()
    updateHorizontalPosition()
  }

  useLayoutEffect(() => {
    if (isOpen) updatePosition()
  }, [isOpen])

  return updateClickCooridinates
}