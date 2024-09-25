import styled from "styled-components"
import { Spinner } from "./spinner"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CustomSpinner = styled(Spinner)`
  font-size: 112px;
  color: #ff9800;
`

export const Loader = () => {
  return (
    <Wrapper>
      <CustomSpinner />
    </Wrapper>
  )
}