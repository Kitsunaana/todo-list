import { Button, ButtonProps } from "antd";
import { Icon, IconProps } from "./icon";

type IconButtonProps = {} & IconProps & Omit<ButtonProps, "color">

export const IconButton = (props: IconButtonProps) => {
  const { name, fontSize, color, ...other } = props

  return (
    <Button
      type="text"
      icon={<Icon name={name} fontSize={fontSize} color={color} />}
      {...other}
    />
  )
}
