import { IBaseIntegration } from "."

export interface ILarkBotIntegrationContent {
  webhookAddress: string
  // useSecret: boolean
  // secret?: string
  bearerToken: string
}

export interface ILarkBotIntegration
  extends IBaseIntegration<ILarkBotIntegrationContent> {
  resourceType: "larkim"
}
