import styled from "styled-components"

export const ContextMenuPopup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  z-index: 100;
  padding: 4px 0px;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12);

  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #fff;
    transform: rotate(45deg);
  }

  &.top::after {
    top: -5px;
  }

  &.bottom::after {
    bottom: -5px;
  }

  &.left::after {
    left: 15px;
  }

  &.right::after {
    right: 15px;
  }
`