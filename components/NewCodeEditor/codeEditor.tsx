import { debounce } from "lodash-es"
import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  getStringSnippets,
  isDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import { ILLACodeMirrorCore } from "./CodeMirror/core"
import { IExpressionShape } from "./CodeMirror/extensions/interface"
import { illaCodeMirrorTooltipStyle } from "./CodeMirror/theme"
import { fixedValue } from "./CodeMirror/utils"
import { ModalCodeMirror } from "./ModalCodeMirror"
import OpenWindowIcon from "./assets/openWindow.svg?react"
import { ICodeEditorProps } from "./interface"
import { ILLACodeMirrorWrapperStyle, openWindowIconHotspotStyle } from "./style"

const CodeEditor: FC<ICodeEditorProps> = (props) => {
  const {
    value = "",
    onChange = () => {},
    placeholder,
    styles,
    options,
    editable = true,
    readOnly,
    wrapperCss,
    completionOptions,
    onBlur = () => {},
    onFocus = () => {},
    canExpand,
    modalTitle = "",
  } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const innerCanExpand = canExpand && !readOnly && editable

  const needExecuteCode = value

  const stringSnippets = useMemo(() => {
    const result: IExpressionShape[] = []
    const dynamicStrings = getStringSnippets(needExecuteCode)
    dynamicStrings.forEach((stringSnippet) => {
      if (isDynamicStringSnippet(stringSnippet)) {
        const currentKey = stringSnippet.split("{{")[1].split("}}")[0].trim()

        if (
          !currentKey ||
          completionOptions.find((item) => item.key.trim() === currentKey)
        ) {
          result.push({ hasError: false, value: stringSnippet })
        } else {
          result.push({ hasError: true, value: stringSnippet })
        }
      }
    })
    return result
  }, [completionOptions, needExecuteCode])

  const hasError = stringSnippets.some((item) => item.hasError)
  const containerRef = useRef<HTMLDivElement>(null)

  const debounceHandleChange = useMemo(() => {
    return debounce(onChange, 160)
  }, [onChange])

  const handleOpenExpandModal = useCallback(() => {
    setIsExpanded(true)
  }, [])

  return (
    <div
      css={[ILLACodeMirrorWrapperStyle, wrapperCss, illaCodeMirrorTooltipStyle]}
      ref={containerRef}
    >
      <ILLACodeMirrorCore
        placeholder={placeholder}
        value={fixedValue(value)}
        onChange={debounceHandleChange}
        styles={styles}
        expressions={stringSnippets}
        options={options}
        editable={editable}
        readOnly={readOnly}
        onBlur={onBlur}
        onFocus={onFocus}
        completionOptions={completionOptions}
        hasError={hasError}
      />
      {innerCanExpand && (
        <div
          css={openWindowIconHotspotStyle}
          className="open-window-icon-hotspot"
          onClick={handleOpenExpandModal}
        >
          <OpenWindowIcon />
        </div>
      )}
      <ModalCodeMirror
        title={modalTitle}
        expand={isExpanded}
        setExpand={setIsExpanded}
        codeMirrorOptions={{
          value: fixedValue(value),
          onChange: onChange,
          lang: options?.lang,
          placeholder: placeholder,
          onBlur: onBlur,
          onFocus: onFocus,
          completionOptions: completionOptions,
        }}
      />
    </div>
  )
}

CodeEditor.displayName = "CodeEditor"
export default CodeEditor
