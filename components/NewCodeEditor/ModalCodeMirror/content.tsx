import { FC, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CodeEditor } from ".."
import { illaCodeMirrorTooltipStyle } from "../CodeMirror/theme"
import { ModalBodyContent } from "../ModalCodeMirror/interface"
import {
  applyCodeMirrorWrapperStyle,
  contentWrapperStyle,
} from "../ModalCodeMirror/style"

export const ModalContent: FC<ModalBodyContent> = (props) => {
  const { lang, onChange, value, placeholder, completionOptions } = props

  const codeMirrorRef = useRef<HTMLDivElement>(null)

  const [canRender, setCanRender] = useState(false)

  useLayoutEffect(() => {
    setCanRender(true)

    return () => {
      setCanRender(false)
    }
  }, [])

  return (
    <div css={contentWrapperStyle}>
      <div css={applyCodeMirrorWrapperStyle}>
        <CodeEditor
          completionOptions={completionOptions}
          options={{
            lang,
            showLineNumbers: true,
            autoCompleteTipContainer: codeMirrorRef.current ?? undefined,
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
      {canRender &&
        createPortal(
          <div
            className="illaCodeMirrorModalWrapper"
            css={illaCodeMirrorTooltipStyle}
            ref={codeMirrorRef}
          />,
          document.body,
        )}
    </div>
  )
}
