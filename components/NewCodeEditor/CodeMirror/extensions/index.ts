import {
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"
import { markdown } from "@codemirror/lang-markdown"
import { sql } from "@codemirror/lang-sql"
import { bracketMatching, indentOnInput } from "@codemirror/language"
import { Extension, Prec } from "@codemirror/state"
import { dropCursor, keymap, lineNumbers, tooltips } from "@codemirror/view"
import {
  Autolink,
  Emoji,
  GFM,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TaskList,
} from "@lezer/markdown"
import { useCallback, useMemo } from "react"
import { CODE_LANG } from "../../interface"
import { buildCompletionSources } from "./completionSources/buildSources"
import { getHighlightExpressionExtension } from "./heighLightJSExpression"
import { highlightSyntaxExtension } from "./highLightSyntax"
import {
  ICodeMirrorOptions,
  ICompletionOption,
  IExpressionShape,
} from "./interface"

export const basicExtension: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
]

const keyMapExtensions = Prec.highest(
  keymap.of([
    { key: "Escape", run: closeCompletion },
    { key: "ArrowDown", run: moveCompletionSelection(true) },
    { key: "ArrowUp", run: moveCompletionSelection(false) },
    { key: "PageDown", run: moveCompletionSelection(true, "page") },
    { key: "PageUp", run: moveCompletionSelection(false, "page") },
    { key: "Tab", run: acceptCompletion },
    { key: "Enter", run: acceptCompletion },
  ]),
)

const getAutoCompletionExtension = (
  lang: CODE_LANG,
  sqlScheme: Record<string, unknown>,
  completionOptions: ICompletionOption[],
) => {
  const completionSources = buildCompletionSources(
    lang,
    sqlScheme,
    completionOptions,
  )
  return [
    autocompletion({
      override: completionSources,
      defaultKeymap: false,
      closeOnBlur: false,
    }),
    keyMapExtensions,
  ]
}

export const useBasicSetup = (
  options: ICodeMirrorOptions,
  completionOptions: ICompletionOption[],
  expressions: IExpressionShape[] = [],
) => {
  const {
    showLineNumbers,
    lang = CODE_LANG.JAVASCRIPT,
    sqlScheme = {},
    autoCompleteTipContainer,
  } = options

  const autocompletionExtension = useMemo(
    () => getAutoCompletionExtension(lang, sqlScheme, completionOptions),
    [completionOptions, lang, sqlScheme],
  )

  const showLinNUmberExtension = useMemo(
    () => (showLineNumbers ? [lineNumbers()] : []),
    [showLineNumbers],
  )

  const highlightJSExpressionExtension = useMemo(() => {
    return getHighlightExpressionExtension(expressions)
  }, [expressions])

  const langExtension = useMemo(() => {
    const plugins: Extension[] = [
      // syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      highlightSyntaxExtension(lang),
    ]
    switch (lang) {
      case CODE_LANG.PGSQL:
      case CODE_LANG.MARIASQL:
      case CODE_LANG.MSSQL:
      case CODE_LANG.SQLite:
      case CODE_LANG.CASSANDRA:
      case CODE_LANG.PLSQL:
      case CODE_LANG.MYSQL:
      case CODE_LANG.SQL: {
        plugins.push(
          sql({
            upperCaseKeywords: true,
          }),
        )
        break
      }
      case CODE_LANG.MARKDOWN: {
        plugins.push(
          markdown({
            extensions: [
              Table,
              TaskList,
              Strikethrough,
              Autolink,
              GFM,
              Subscript,
              Superscript,
              Emoji,
            ],
          }),
        )
        break
      }
      case CODE_LANG.JAVASCRIPT:
      default: {
        plugins.push(javascript())
        break
      }
    }
    return plugins
  }, [lang])

  const buildTooltipExtension = useCallback(
    (autoCompleteTipContainer?: HTMLElement) => {
      return tooltips({
        position: "fixed",
        parent:
          autoCompleteTipContainer ||
          document.querySelector<HTMLElement>(".illaCodeMirrorWrapper") ||
          document.body,
      })
    },
    [],
  )

  const tooltipExtension = useMemo(() => {
    return buildTooltipExtension(autoCompleteTipContainer)
  }, [autoCompleteTipContainer, buildTooltipExtension])

  const extensions = useMemo(
    () => [
      basicExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
      showLinNUmberExtension,
      langExtension,
      tooltipExtension,
    ],
    [
      autocompletionExtension,
      highlightJSExpressionExtension,
      langExtension,
      showLinNUmberExtension,
      tooltipExtension,
    ],
  )

  return extensions
}
