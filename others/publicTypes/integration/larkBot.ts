import { IBaseIntegration } from "."

export interface ILarkBotIntegrationContent {
  webhookAddress: string
  useSecret: boolean
  secret?: string
  allowImageContent: boolean
  bearerToken?: string
}

export interface ILarkBotIntegration
  extends IBaseIntegration<ILarkBotIntegrationContent> {
  resourceType: "larkbot"
}
