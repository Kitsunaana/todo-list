const icons = {
  add: "note_add",
  actions: "more_vert",
  settings: "tune",
  reload: "sync",
  remove: "delete",
  allDone: "done_all",
  selected: "settings",
  edit: "edit",
  addFavorite: "favorite",
  doDone: "check",
  filter: "filter_alt",
  undo: "undo",
  redo: "redo",
} as const

export type IconNames = keyof typeof icons

export type IconProps = {
  name: IconNames
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
