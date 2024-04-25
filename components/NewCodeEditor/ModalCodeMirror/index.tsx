import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DraggableModal } from "@illa-public/draggable-modal"
import { ModalContent } from "../ModalCodeMirror/content"
import { ModalCodeMirrorProps } from "../ModalCodeMirror/interface"

export const ModalCodeMirror: FC<ModalCodeMirrorProps> = (props) => {
  const { title, expand, setExpand, codeMirrorOptions } = props
  const { t } = useTranslation()
  const {
    placeholder,
    onBlur,
    onFocus,
    completionOptions,
    value,
    lang,
    onChange,
  } = codeMirrorOptions

  return (
    <DraggableModal
      title={title || t("editor.inspect.setter_label.code.write_code")}
      open={expand}
      changeOpen={setExpand}
    >
      <ModalContent
        lang={lang}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        completionOptions={completionOptions}
      />
    </DraggableModal>
  )
}
