import { SerializedStyles } from "@emotion/react"
import { ILLACodeMirrorProps } from "./CodeMirror/interface"

export interface ICodeEditorProps {
  value?: ILLACodeMirrorProps["value"]
  onChange?: ILLACodeMirrorProps["onChange"]
  onFocus?: ILLACodeMirrorProps["onFocus"]
  onBlur?: ILLACodeMirrorProps["onBlur"]
  editable?: ILLACodeMirrorProps["editable"]
  readOnly?: ILLACodeMirrorProps["editable"]
  placeholder?: ILLACodeMirrorProps["placeholder"]
  options?: ILLACodeMirrorProps["options"]
  completionOptions: ILLACodeMirrorProps["completionOptions"]
  styles?: ILLACodeMirrorProps["styles"]
  wrapperCss?: SerializedStyles
  canExpand?: boolean
  modalTitle?: string
}
