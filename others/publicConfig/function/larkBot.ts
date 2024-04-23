import {
  IBaseFunction,
  IGuiLarkBotFunctionContent,
  LARK_BOT_CONTENT_MODE,
} from "@illa-public/public-types"

export const INIT_LARK_BOT_FUNCTION: IBaseFunction<IGuiLarkBotFunctionContent> =
  {
    name: "",
    description: "",
    config: {
      icon: "",
      variables: [],
    },
    resourceID: "",
    content: {
      contentMode: LARK_BOT_CONTENT_MODE.GUI,
      content: [],
      language: [],
      title: "",
    },
  }
