import {
  Completion,
  CompletionContext,
  CompletionSource,
} from "@codemirror/autocomplete"
import { EditorView } from "@codemirror/view"
import { capitalize } from "lodash-es"
import { ICompletionOption } from "../interface"
import { checkCursorInDynamicFlag } from "./util"

export const getDataInfo = (
  completeOptions: ICompletionOption[],
  path: string,
): [ICompletionOption[], number] => {
  const pos = path.lastIndexOf(".")
  if (pos < 0) {
    const target = completeOptions.filter((option) =>
      option.key.startsWith(path),
    )
    return [target, 0]
  }

  const parentPath = path.slice(0, pos)
  const target = completeOptions.filter((option) =>
    option.key.startsWith(parentPath),
  )
  if (target) {
    return [target, pos + 1]
  }

  return [completeOptions, 0]
}

export const buildILLAContextCompletionSource = (
  completeOptions: ICompletionOption[],
): CompletionSource => {
  return (context: CompletionContext) => {
    const isCursorInDynamicFlag = checkCursorInDynamicFlag(context)
    if (!isCursorInDynamicFlag) {
      return null
    }
    const matchPath = context.matchBefore(
      /(?:[A-Za-z_$][\w$]*(?:\[\s*(?:\d+|(["'])(?:[^\1\\]|\\.)*?\1)\s*\])*\.)*(?:[A-Za-z_$][\w$]*)?/,
    )
    if (!matchPath) {
      return null
    }

    if (
      matchPath.text.length === 0 &&
      context.matchBefore(/\{\{\s*/) === null
    ) {
      return null
    }

    const info = getDataInfo(completeOptions, matchPath.text)
    if (!info) {
      return null
    }
    const [currentData, offset] = info
    const keysMapCompletionOption = currentData.reduce(
      (acc, item) => {
        acc[item.key] = item
        return acc
      },
      {} as Record<string, ICompletionOption>,
    )
    const keys = currentData.map((item) => item.key)

    const options = keys.map((key) => {
      const item = keysMapCompletionOption[key]
      const result: Completion = {
        type: item.type ? capitalize(item.type) : undefined,
        label: key,
        detail: item.value || undefined,
        boost: 1,
        apply:
          offset === 0
            ? undefined
            : (view: EditorView, c: Completion, from: number, to: number) => {
                view.dispatch({
                  changes: {
                    from: from - 1,
                    to: to,
                    insert: key.match(/^[A-Za-z_$][\w$]*$/)
                      ? `.${key}`
                      : `['${key.replace(/[\\']/g, (c) => "\\" + c)}']`,
                  },
                })
              },
      }
      if (item.description) {
        result.info = () => {
          let dom = document.createElement("span")
          dom.innerHTML = `<div class="completionInfoCardTitle">
        <span class="cardTitle">${key}</span>

      </div>
      <p class="completionInfoType">${item.type}</p>
      <p class="completionInfoDoc">${item.description}</p>
      `
          return dom
        }
      }

      return result
    })

    const completions = {
      from: matchPath.from + offset,
      validFor: /^\w*$/,
      options: options,
    }
    return completions
  }
}
