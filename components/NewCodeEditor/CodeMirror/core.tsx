import { closeCompletion } from "@codemirror/autocomplete"
import {
  Compartment,
  EditorState,
  Extension,
  StateEffect,
} from "@codemirror/state"
import {
  EditorView,
  placeholder as placeholderExtension,
} from "@codemirror/view"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CODE_LANG } from "../interface"
import { useBasicSetup } from "./extensions"
import { ILLACodeMirrorProps } from "./interface"
import { applyEditorWrapperStyle } from "./style"
import { ILLACodeMirrorTheme } from "./theme"

// thk ReactCodeMirror:https://github.com/uiwjs/react-codemirror
export const ILLACodeMirrorCore: FC<ILLACodeMirrorProps> = (props) => {
  const {
    value,
    styles = {},
    extensionOptions,
    editable = true,
    readOnly = false,
    placeholder,
    completionOptions,
    hasError = false,
    expressions = [],
    onChange,
    onBlur,
    onFocus,
  } = props

  const {
    singleLine,
    showLineNumbers = false,
    lang = CODE_LANG.MARKDOWN,
    sqlScheme = {},
  } = extensionOptions ?? {}

  const [isFocus, setIsFocus] = useState(false)

  const editorViewRef = useRef<EditorView>()
  const editorWrapperRef = useRef<HTMLDivElement | null>(null)
  const compartmentsRef = useRef<Compartment[]>([])

  const basicExtensionOptions = useMemo(() => {
    return {
      expressions,
      showLineNumbers,
      lang,
      sqlScheme,
    }
  }, [expressions, lang, showLineNumbers, sqlScheme])

  const basicExtensions = useBasicSetup(
    basicExtensionOptions,
    completionOptions,
    expressions,
  )

  const defaultThemeOption = useMemo(
    () =>
      EditorView.theme({
        "&": {
          ...styles,
        },
        ...ILLACodeMirrorTheme,
      }),
    [styles],
  )

  const focusUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.focusChanged) {
        setIsFocus(viewUpdate.view.hasFocus)
        const currentString = viewUpdate.state.doc.toString()

        if (viewUpdate.view.hasFocus) {
          onFocus?.()
        } else {
          onBlur?.(currentString)
        }
        if (!viewUpdate.view.hasFocus) {
          setTimeout(() => {
            closeCompletion(viewUpdate.view)
          }, 500)
        }
      }
    })
  }, [onBlur, onFocus])

  const changeUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      const currentString = viewUpdate.state.doc.toString()
      if (viewUpdate.docChanged) {
        onChange?.(currentString)
      }
    })
  }, [onChange])

  const readOnlyStateChangeEffect: Extension = useMemo(
    () => EditorState.readOnly.of(readOnly),
    [readOnly],
  )

  const editableStateChangeEffect: Extension = useMemo(
    () => EditorView.editable.of(editable),
    [editable],
  )

  const placeholderExt: Extension = useMemo(() => {
    return typeof placeholder === "string"
      ? placeholderExtension(placeholder)
      : []
  }, [placeholder])

  const singleLineExt: Extension = useMemo(() => {
    return singleLine
      ? EditorState.transactionFilter.of((tr) => {
          return tr.newDoc.lines > 1 ? [] : [tr]
        })
      : EditorView.lineWrapping
  }, [singleLine])

  const allExtensions = useMemo(() => {
    return [
      basicExtensions,
      defaultThemeOption,
      focusUpdateListener,
      changeUpdateListener,
      readOnlyStateChangeEffect,
      editableStateChangeEffect,
      placeholderExt,
      singleLineExt,
      EditorView.lineWrapping,
    ]
  }, [
    basicExtensions,
    defaultThemeOption,
    focusUpdateListener,
    changeUpdateListener,
    readOnlyStateChangeEffect,
    editableStateChangeEffect,
    placeholderExt,
    singleLineExt,
  ])

  const extensionsWithCompartment = useMemo(() => {
    for (
      let i = compartmentsRef.current.length;
      i < allExtensions.length;
      i++
    ) {
      const compartment = new Compartment()
      compartmentsRef.current.push(compartment)
    }
    return allExtensions.map((ext, index) =>
      compartmentsRef.current[index].of(ext),
    )
  }, [allExtensions])

  useEffect(() => {
    if (
      !editorViewRef.current ||
      (!isFocus && value !== editorViewRef.current.state.doc.toString())
    ) {
      const state = EditorState.create({
        doc: value,
        extensions: extensionsWithCompartment,
      })
      if (editorViewRef.current) {
        editorViewRef.current.setState(state)
      } else {
        if (editorWrapperRef.current) {
          editorViewRef.current = new EditorView({
            state,
            parent: editorWrapperRef.current,
          })
        }
      }
    }
  }, [value, extensionsWithCompartment, isFocus])

  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (view) {
        const effects: StateEffect<unknown>[] = []
        allExtensions.forEach((e, i) => {
          if (compartmentsRef.current[i].get(view.state) !== e) {
            effects.push(compartmentsRef.current[i].reconfigure(e))
          }
        })
        if (effects.length > 0) {
          view.dispatch({ effects })
        }
      }
    },
    [allExtensions],
  )

  useEffect(() => {
    if (editorViewRef.current) {
      reconfigure(editorViewRef.current)
    }
  }, [reconfigure])

  return (
    <div
      ref={editorWrapperRef}
      css={applyEditorWrapperStyle(hasError, isFocus, editable, readOnly)}
    />
  )
}
