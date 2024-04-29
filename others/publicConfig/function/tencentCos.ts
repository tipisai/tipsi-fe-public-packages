import {
  FUNCTION_ACTION_TYPE,
  ITencentCosFunction,
  IVariables,
  TENCENT_COS_ACTION_OPERATION,
  TTencentCosFunctionContent,
  VARIABLE_TYPE,
} from "@illa-public/public-types"
import { getInitBaseFunction } from "."

export const INIT_TENCENT_COS_FUNCTION_CONTENT: TTencentCosFunctionContent = {
  actionType: FUNCTION_ACTION_TYPE.GET_DOWNLOAD_URL,
  config: {
    objectName: "",
    versionID: "",
  },
}

export const getInitTencentCosFunction = (): ITencentCosFunction => {
  const baseFunction = getInitBaseFunction()

  return {
    ...baseFunction,
    config: {
      ...baseFunction.config,
      icon: "https://cdn.tipis.ai/tipis/default-tipi-icon.png",
    },
    resourceType: "tencentcos",
    // content: INIT_TENCENT_COS_FUNCTION_CONTENT,
    content: {},
    actionOperation: TENCENT_COS_ACTION_OPERATION.TENCENT_COS_LIST,
  }
}

export const DEFAULT_TENCENT_COS_PARAMETERS: IVariables[] = [
  {
    name: "fileName",
    description: "fileName",
    type: VARIABLE_TYPE.STRING,
    isEnum: false,
    required: true,
    enum: [],
    children: [],
  },
]
