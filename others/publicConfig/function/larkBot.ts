import {
  IGuiLarkBotFunctionContent,
  ILarkBotFUnction,
  IVariables,
  LARK_BOT_ACTION_OPERATION,
  LARK_BOT_CONTENT_MODE,
  VARIABLE_TYPE,
} from "@illa-public/public-types"
import { getInitBaseFunction } from "."

export const INIT_LARK_BOT_FUNCTION_CONTENT: IGuiLarkBotFunctionContent = {
  contentMode: LARK_BOT_CONTENT_MODE.GUI,
  content: [],
  language: [],
  title: "",
}

export const getInitLarkBotFunction = (): ILarkBotFUnction => {
  const baseFunction = getInitBaseFunction()

  return {
    ...baseFunction,
    resourceType: "larkbot",
    // content: INIT_LARK_BOT_FUNCTION_CONTENT,
    content: {},
    actionOperation: LARK_BOT_ACTION_OPERATION.LARK_IM_SEND_MESSAGE,
  }
}

export const DEFAULT_LARK_BOT_PARAMETERS: IVariables[] = [
  {
    name: "fileName",
    description: "fileName",
    type: VARIABLE_TYPE.STRING,
    isEnum: false,
    required: false,
    enum: [],
    children: [],
  },
]
