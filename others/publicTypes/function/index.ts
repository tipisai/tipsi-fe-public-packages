import type { TLarkBotFunctionContent } from "./larkBot"
import type { TTencentCosFunctionContent } from "./tencentCos"

export type TFunctionContent =
  | TTencentCosFunctionContent
  | TLarkBotFunctionContent

export enum VARIABLE_TYPE {
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOLEAN = "boolean",
}

export interface IVariables {
  name: string
  required: boolean
  type: VARIABLE_TYPE
  description: string
  isEnum: boolean
  enumValues: string[]
}

export interface IFunctionConfig {
  icon: string
  variables: IVariables[]
}

export interface IBaseFunction<T extends unknown = unknown> {
  name: string
  description: string
  config: IFunctionConfig
  resourceID: string
  content: T
}

export * from "./larkBot"
export * from "./tencentCos"
