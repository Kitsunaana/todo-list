import { ReactNode } from "react"


export const Mark = ({ children }: { children: ReactNode }) => {
  return (
    <strong
      style={{
        fontWeight: "unset",
        padding: "2px 8px",
        display: "inline-flex",
        borderRadius: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.12)"
      }}
    >
      {children}
    </strong>
  )
}
