import { ILarkBotIntegration } from "@illa-public/public-types"

export const INIT_LARK_BOT_INTEGRATION: ILarkBotIntegration = {
  resourceType: "larkBot",
  resourceID: "",
  resourceName: "",
  content: {
    webhookAddress: "",
    useSecret: false,
    allowImageContent: false,
  },
}
