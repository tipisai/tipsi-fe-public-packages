import { CODE_LANG } from "../../interface"

export interface IExpressionShape {
  value: string
  hasError: boolean
}

export interface ICodeMirrorOptions {
  showLineNumbers?: boolean
  lang?: CODE_LANG
  sqlScheme?: Record<string, unknown>
  singleLine?: boolean
  autoCompleteTipContainer?: HTMLElement
}

export interface ICompletionOption {
  key: string
  value: any
  description?: string
  type?: string
}
