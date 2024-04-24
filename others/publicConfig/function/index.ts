import {
  IBaseFunction,
  IVariables,
  TIntegrationType,
  VARIABLE_TYPE,
} from "@illa-public/public-types"
import { INIT_LARK_BOT_FUNCTION } from "./larkBot"
import { INIT_TENCENT_COS_FUNCTION } from "./tencentCos"

export const getFunctionInitDataByType = (
  integrationType: TIntegrationType,
): IBaseFunction => {
  switch (integrationType) {
    case "tencentcos": {
      return INIT_TENCENT_COS_FUNCTION
    }
    case "larkBot":
      return INIT_LARK_BOT_FUNCTION
  }
}

export const INIT_VARIABLE: IVariables = {
  name: "",
  type: VARIABLE_TYPE.STRING,
  testValue: "",
  required: true,
  enumValues: [],
  description: "",
  isEnum: false,
}
