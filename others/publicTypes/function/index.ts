import { TIntegrationType } from "../integration"
import type { ILarkBotFUnction, TLarkBotFunctionContent } from "./larkBot"
import type {
  ITencentCosFunction,
  TTencentCosFunctionContent,
} from "./tencentCos"

export type TFunctionContent =
  | TTencentCosFunctionContent
  | TLarkBotFunctionContent

export enum VARIABLE_TYPE {
  STRING = "string",
  INT = "integer",
  FLOAT = "number",
  BOOLEAN = "boolean",
  NULL = "null",
  OBJECT = "object",
  STRING_ARRAY = "stringArray",
  INTEGER_ARRAY = "integerArray",
  NUMBER_ARRAY = "numberArray",
  BOOLEAN_ARRAY = "booleanArray",
  NULL_ARRAY = "nullArray",
  OBJECT_ARRAY = "objectArray",
}

export interface IVariables {
  name: string
  description: string
  type: VARIABLE_TYPE
  isEnum: boolean
  required: boolean
  enum: string[]
  children: IVariables[]
  testValue?: string
}

export interface IFunctionConfig {
  icon: string
}

export interface IBaseFunction<T extends unknown = unknown> {
  name: string
  description: string
  resourceType: TIntegrationType
  resourceID: string
  config: IFunctionConfig
  parameters: IVariables[]
  content: T
}

export type IFunctionInterface = ITencentCosFunction | ILarkBotFUnction

export * from "./larkBot"
export * from "./tencentCos"
