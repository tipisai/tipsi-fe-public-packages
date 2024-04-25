import {
  ICodeMirrorOptions,
  ICompletionOption,
  IExpressionShape,
} from "./extensions/interface"

export interface IILLACodeMirrorStyles {
  height?: string
  minHeight?: string
  maxHeight?: string
  width?: string
  minWidth?: string
  maxWidth?: string
}

export interface ILLACodeMirrorProps {
  options?: ICodeMirrorOptions
  expressions?: IExpressionShape[]
  completionOptions: ICompletionOption[]
  styles?: IILLACodeMirrorStyles
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  editable?: boolean
  readOnly?: boolean
  placeholder?: string
  hasError?: boolean
}

export enum RESULT_TYPES {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
  FUNCTION = "FUNCTION",
  UNDEFINED = "UNDEFINED",
  NULL = "NULL",
  UNKNOWN = "UNKNOWN",
}
