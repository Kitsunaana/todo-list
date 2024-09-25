export interface TodoPreviewSettings {
  isShowHatch: boolean
  isShowStatus: boolean
}

export type Key = keyof TodoPreviewSettings
export type Value = TodoPreviewSettings[Key]
