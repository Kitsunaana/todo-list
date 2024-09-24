import { useUpsertDialog } from "@shared/hooks/use-upsert-dialog";
import { Modal, Typography } from "antd";
import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components"

const { Text } = Typography;

const CustomModal = styled(Modal)`
  && .ant-modal-content {
    padding: 8px;
  }
`

const ModalHeader = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: linear-gradient(315deg, #0000 48%, rgba(237, 108, 2, 0.35) 50%, #0000 52%);
  background-size: 7px 7px;
  border-radius: 8px;
  padding: 8px;
  height: 38px;
  border: 1px solid rgba(158, 158, 158, 0.25);
  justify-content: center;
  margin-bottom: 8px;
`

interface UpsertDialogProps {
  content: ReactNode
  onCreate: (data) => void
  isLoading: boolean
}

export const UpsertDialog = observer((props: UpsertDialogProps) => {
  const { content, onCreate, isLoading } = props

  const { isOpen, onClose } = useUpsertDialog()
  const methods = useFormContext()

  const onSubmit = () => {
    methods.handleSubmit(onCreate)()
  }

  return (
    <CustomModal 
      open={isOpen} 
      onOk={onSubmit} 
      onCancel={() => {
        onClose()

        methods.reset()
      }} 
      maskClosable={false}
      closable={false}
      cancelText={"ОТМЕНА"}
      okText={"СОХРАНИТЬ"}
      okButtonProps={{ disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <ModalHeader>
        <Text>Создание задачи</Text>
      </ModalHeader>

      {content}
    </CustomModal>
  )
})
  