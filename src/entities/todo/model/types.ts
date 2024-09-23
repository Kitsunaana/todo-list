export interface TodoPreviewSettings {
  isShowHatch: boolean
}

export type Key = keyof TodoPreviewSettings
export type Value = TodoPreviewSettings[Key]
