import { Icon } from "@shared/ui/icon"
import { Button, Popover } from "antd"
import { useState } from "react"
import { FooterPopup } from "./footer-popup"


export const Footer = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div
      style={{
        paddingTop: 8,
        display: "flex",
        flexFlow: "row",
        gap: 8,
        alignItems: "center",
        margin: "auto 0px 0px",
      }}
    >
      <Popover 
        trigger="click" 
        placement="topLeft" 
        content={<FooterPopup />} 
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Button
          type="text"
          icon={<Icon name="selected" />}
        />
      </Popover>
    </div>
  )
}
