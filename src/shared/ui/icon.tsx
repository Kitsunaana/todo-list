const icons = {
  add: "note_add",
  actions: "more_vert",
  settings: "tune",
  reload: "sync",
} as const

export type IconProps = {
  name: keyof typeof icons
  fontSize?: number
  color?: string
}

export const Icon = (props: IconProps) => {
  const { name, fontSize, color } = props

  return (
    <span
      style={{ fontSize, color }}
      className="material-symbols-outlined"
    >
      {icons[name]}
    </span>
  )
}
