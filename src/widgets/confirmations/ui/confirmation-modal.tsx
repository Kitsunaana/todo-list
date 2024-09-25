import {ConfirmationModalParams} from "../model/types.ts";
import {Button, Typography} from "antd"
import {Modal} from "@shared/ui/modal.tsx";

const { Text } = Typography

interface ConfirmationModalProps {
  params: ConfirmationModalParams
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { params } = props

  return (
    <Modal isOpen onClose={params.onClose}>
      <Modal.Header><Text>{params.title}</Text></Modal.Header>
      <Modal.Body><Text>{params.description}</Text></Modal.Body>
      <Modal.Footer>
        <Button onClick={params.onClose}>{params.closeText}</Button>
        <Button onClick={params.onConfirm}>{params.confirmText}</Button>
      </Modal.Footer>
    </Modal>
  )
}

