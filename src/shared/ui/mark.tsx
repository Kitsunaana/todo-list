import styled from "styled-components"

interface MarkProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  bgColor?: string
}

export const Mark = styled((props: MarkProps) => {
  const { bgColor, ...other } = props

  return <strong {...other} />
})`
  font-weight: unset;
  padding: 2px 8px;
  display: inline-flex;
  border-radius: 4px;
  background-color: ${({ bgColor }) => bgColor ?? "rgba(0, 0, 0, 0.12)"};
`