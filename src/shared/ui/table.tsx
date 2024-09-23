import styled from "styled-components";
import {ReactNode} from "react";

const Overlay = styled("div")`
    background-color: #ffffff;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
`

interface TableProps {
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

export const Table = (props: TableProps) => {
  const { header, content, footer } = props

  return (
    <Overlay>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid"
        }}
      >
        <div
          style={{
            padding: 8,
            display: "flex",
            flexFlow: "column",
            overflow: "auto",
            WebkitBoxFlex: 1,
          }}
        >

          {header}

          <div
            style={{
              display: "flex",
              flexFlow: "row",
              overflow: "auto",
              WebkitBoxFlex: 1,
              flexGrow: 1,
              gap: 4,
            }}
          >
            <div
              style={{
                flexBasis: "100%",
                display: "flex",
                flexFlow: "column",
                overflow: "auto"
              }}
            >

              {content}

              {footer}

            </div>
          </div>
        </div>

      </div>
    </Overlay>
  )
}

