import { UpsertDialogContext } from "@shared/context/upsert-dialog-context"
import { useContext } from "react"

export const useUpsertDialog = () => useContext(UpsertDialogContext)