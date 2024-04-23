import { ILarkBotIntegrationContent } from "./larkBot"
import { ITencentCosIntegrationContent } from "./tencentCos"

export type TIntegrationType = "tencentCos" | "larkBot"

export type TIntegrationContent =
  | ITencentCosIntegrationContent
  | ILarkBotIntegrationContent

export interface IBaseIntegration<
  T extends TIntegrationContent | unknown = unknown,
> {
  resourceID: string
  resourceName: string
  resourceType: TIntegrationType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

export * from "./larkBot"
export * from "./tencentCos"
