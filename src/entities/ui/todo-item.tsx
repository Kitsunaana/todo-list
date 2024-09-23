import {Collapse} from "antd";
import { TodoDto } from "../../shared/types"
import styled, {css} from "styled-components";
import * as React from "react";

export const backgroundStyles: Record<TodoDto.Todo["status"], React.CSSProperties> = {
  working: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #ab47bc 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #ab47bc"
  },
  done: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #9ccc65 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #9ccc65"
  },
  open: {
    backgroundImage: `linear-gradient(315deg, #0000 48%, #26c6da 50%, #0000 52%)`,
    backgroundSize: "8px 8px",
    borderLeft: "4px solid #26c6da"
  }
}

const { Panel } = Collapse;

interface TodoItemProps {
  isShowHatch: boolean
  status: TodoDto.Todo["status"]
}

export const TodoItem = styled((props: TodoItemProps) => {
  const { isShowHatch, status, ...other } = props

  return <Panel {...other} />
})<TodoItemProps>`
  ${({ status }) => backgroundStyles[status]}
  ${({ isShowHatch }) => isShowHatch ? {} :  css`background-image: unset !important;`}  
  
  &:first-child {
    border-top-left-radius: 4px;
  }
    
  && .ant-collapse-header {
    align-items: center;
    display: flex;
    padding: 8px;
  }
    
  && .ant-collapse-expand-icon {
    padding-inline-start: 4px;
  }
`;
