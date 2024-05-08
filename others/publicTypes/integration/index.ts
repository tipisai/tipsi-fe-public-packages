import { ILarkBotIntegrationContent } from "./larkBot"
import { ITencentCosIntegrationContent } from "./tencentCos"

export type TIntegrationType = "tencentcos" | "larkim"

export type TIntegrationContent =
  | ITencentCosIntegrationContent
  | ILarkBotIntegrationContent

export interface IBaseIntegration<T extends unknown = unknown> {
  resourceID: string
  resourceName: string
  resourceType: TIntegrationType
  content: T
}

export * from "./larkBot"
export * from "./tencentCos"
