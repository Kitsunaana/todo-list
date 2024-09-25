import {ConfirmationModalParams} from "../model/types";
import {Button, Typography} from "antd"
import {Modal} from "@shared/ui/modal";
import { useEvent } from "@shared/hooks/use-event";

const { Text } = Typography

interface ConfirmationModalProps {
  params: ConfirmationModalParams
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { params } = props

  useEvent("keydown", (event) => { 
    if (event.key === "Enter") params.onConfirm()
  })

  return (
    <Modal isOpen onClose={params.onClose}>
      <Modal.Header><Text>{params.title}</Text></Modal.Header>
      <Modal.Body><Text>{params.description}</Text></Modal.Body>
      <Modal.Footer>
        <Button onClick={params.onClose}>{params.closeText}</Button>
        <Button onClick={params.onConfirm} type="primary">{params.confirmText}</Button>
      </Modal.Footer>
    </Modal>
  )
}

