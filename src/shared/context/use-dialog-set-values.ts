import { useEffect } from "react"
import { FieldValues, UseFormReset } from "react-hook-form"

interface Options<TData extends FieldValues> {
  data: TData | undefined,
  defaultValues: TData,
  should: boolean,
  reset: UseFormReset<TData>
}

export const useDialogSetValues = <TData extends FieldValues,>(options: Options<TData>) => {
  const { data, defaultValues, should, reset } = options

  useEffect(() => {
    if (should && data !== undefined) reset(data)
    else reset(defaultValues)
  }, [data, reset, should, defaultValues])
}