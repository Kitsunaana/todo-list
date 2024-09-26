import { ReactNode } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
`

const FullContentWrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-flow: column;
  overflow: auto;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row;
  overflow: auto;
  flex-grow: 1;
  gap: 4px;
`

const ContentInner = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-flow: column;
  overflow: auto;
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
      <Wrapper>
        <FullContentWrapper>
          {header}

          <ContentWrapper>
            <ContentInner>
              {content}

              {footer}
            </ContentInner>
          </ContentWrapper>
        </FullContentWrapper>
      </Wrapper>
    </Overlay>
  )
}

