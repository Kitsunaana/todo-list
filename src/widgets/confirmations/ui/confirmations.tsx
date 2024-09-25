import {FC, PropsWithChildren, useState} from "react";
import {ConfirmationModalParams} from "../model/types.ts"
import {confirmationContext, ConfirmationParams} from "../../../shared/lib/confirmation.tsx";
import {defaultConfirmationParams} from "../constants.ts";
import {Button} from "antd";
import {ConfirmationModal} from "./confirmation-modal.tsx";

export const Confirmations: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [modalParams, setModalParams] = useState<ConfirmationModalParams>()

  const closeConfirmation = () => modalParams?.onClose()

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>((resolve) => {
      setModalParams({
        ...defaultConfirmationParams,
        ...params,
        onConfirm: () => {
          setModalParams(undefined)
          resolve(true)
        },
        onClose: () => {
          closeConfirmation()
          setModalParams(undefined)
          resolve(false)
        }
      })
    })
  }

  return (
    <confirmationContext.Provider
      value={{
        getConfirmation,
        closeConfirmation
      }}
    >
      {children}

      {modalParams && <ConfirmationModal params={modalParams} />}
    </confirmationContext.Provider>
  )
}
