import { useEffect } from "react"

interface Options {
  should: boolean
  close: () => void
}

export const useDialogClose = (options: Options) => {
  const { close, should } = options

  useEffect(() => { if (should) close() }, [should, close])
}