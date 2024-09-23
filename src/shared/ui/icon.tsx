const icons = {
  add: "note_add",
  actions: "more_vert",
  settings: "tune",
  reload: "sync",
  remove: "delete",
  allDone: "done_all",
  selected: "settings"
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
      style={{ fontSize: fontSize ?? 20, color }}
      className="material-symbols-outlined"
    >
      {icons[name]}
    </span>
  )
}
