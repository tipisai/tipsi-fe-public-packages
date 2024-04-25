import {
  IBaseFunction,
  IVariables,
  TIntegrationType,
  VARIABLE_TYPE,
} from "@illa-public/public-types"
import { getInitLarkBotFunction } from "./larkBot"
import { getInitTencentCosFunction } from "./tencentCos"

export const getInitBaseFunction = (): IBaseFunction => ({
  name: "",
  description: "",
  resourceID: "",
  config: {
    icon: "",
  },
  parameters: [],
  resourceType: "tencentcos",
  content: undefined,
})

export const getFunctionInitDataByType = (
  integrationType: TIntegrationType,
): IBaseFunction => {
  switch (integrationType) {
    case "tencentcos": {
      return getInitTencentCosFunction()
    }
    case "larkBot":
      return getInitLarkBotFunction()
  }
}

export const INIT_VARIABLE: IVariables = {
  name: "",
  type: VARIABLE_TYPE.STRING,
  testValue: "",
  required: true,
  enum: [],
  description: "",
  isEnum: false,
  children: [],
}
