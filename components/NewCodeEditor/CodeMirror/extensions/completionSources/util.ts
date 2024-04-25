import { CompletionContext } from "@codemirror/autocomplete"
import { getStringSnippets } from "@illa-public/dynamic-string"
import { DATA_VALUE_TYPE } from "../interface"

export function getDataType(data: unknown): DATA_VALUE_TYPE {
  const type = typeof data
  if (type === "number") return DATA_VALUE_TYPE.NUMBER
  else if (type === "string") return DATA_VALUE_TYPE.STRING
  else if (type === "boolean") return DATA_VALUE_TYPE.BOOLEAN
  else if (Array.isArray(data)) return DATA_VALUE_TYPE.ARRAY
  else if (type === "function") return DATA_VALUE_TYPE.FUNCTION
  else if (type === "undefined") return DATA_VALUE_TYPE.UNKNOWN
  return DATA_VALUE_TYPE.OBJECT
}

export function checkCursorInDynamicFlag(context: CompletionContext): boolean {
  const { state, pos } = context
  const doc = state.sliceDoc(0, pos)
  const stringSnippets = getStringSnippets(doc)
  let nextDynamicStringStartIndex = 0
  for (let i = 0; i < stringSnippets.length; i++) {
    const snippet = stringSnippets[i]
    const start = nextDynamicStringStartIndex
    const dynamicStringStartIndex = snippet.indexOf("{{")
    const stringStartIndex = dynamicStringStartIndex + start + 2
    const dynamicStringEndIndex = snippet.indexOf("}}")
    const stringEndIndex = dynamicStringEndIndex + start
    if (
      dynamicStringStartIndex > -1 &&
      stringStartIndex <= pos &&
      (dynamicStringEndIndex <= -1 || pos <= stringEndIndex)
    ) {
      return true
    }
    nextDynamicStringStartIndex += snippet.length
  }
  return false
}
