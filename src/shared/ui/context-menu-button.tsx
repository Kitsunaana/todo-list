import { Button, ButtonProps } from "antd"
import styled from "styled-components"
import { Icon, IconNames } from "./icon"

interface ContextMenuButtonProps extends ButtonProps {
  iconName: IconNames
  iconColor?: string
  text: string
}

export const ContextMenuButton = styled((props: ContextMenuButtonProps) => {
  const { iconName, text, iconColor, ...other } = props

  return (
    <Button
      {...other}
      iconPosition={"end"} 
      icon={<Icon name={iconName} color={iconColor} />}
    >
      {text}
    </Button>
  )
})`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between 
`