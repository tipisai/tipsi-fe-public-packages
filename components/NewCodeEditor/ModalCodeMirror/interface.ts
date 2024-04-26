import { CODE_LANG, ICodeEditorProps } from "../interface"

export interface ModalBodyContent {
  placeholder?: string
  lang?: CODE_LANG
  onChange?: ICodeEditorProps["onChange"]
  onFocus?: ICodeEditorProps["onFocus"]
  onBlur?: ICodeEditorProps["onBlur"]
  value: string
  completionOptions: ICodeEditorProps["completionOptions"]
}

export interface FooterContentProps {
  onClickSaveButton: () => void
}

export interface ModalCodeMirrorProps {
  title: string
  expand: boolean
  setExpand: (expand: boolean) => void
  onClickSaveButton?: () => void
  codeMirrorOptions: ModalBodyContent
}
