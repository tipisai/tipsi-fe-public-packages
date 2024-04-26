import {
  IGuiLarkBotFunctionContent,
  ILarkBotFUnction,
  LARK_BOT_ACTION_OPERATION,
  LARK_BOT_CONTENT_MODE,
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
    resourceType: "larkBot",
    // content: INIT_LARK_BOT_FUNCTION_CONTENT,
    content: {},
    actionOperation: LARK_BOT_ACTION_OPERATION.LARK_IM_SEND_MESSAGE,
  }
}
