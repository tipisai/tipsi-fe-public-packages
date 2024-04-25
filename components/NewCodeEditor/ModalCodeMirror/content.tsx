import { FC } from "react"
import { CodeEditor } from ".."
import { ModalBodyContent } from "../ModalCodeMirror/interface"
import {
  applyCodeMirrorWrapperStyle,
  contentWrapperStyle,
} from "../ModalCodeMirror/style"

export const ModalContent: FC<ModalBodyContent> = (props) => {
  const { lang, onChange, value, placeholder, completionOptions } = props

  return (
    <div css={contentWrapperStyle}>
      <div css={applyCodeMirrorWrapperStyle}>
        <CodeEditor
          completionOptions={completionOptions}
          options={{
            lang,
            showLineNumbers: true,
          }}
          styles={{
            minHeight: "88px",
            height: "100%",
          }}
          value={value}
          onChange={onChange}
          canExpand={false}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
