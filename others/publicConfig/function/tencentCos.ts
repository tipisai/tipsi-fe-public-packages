import {
  FUNCTION_ACTION_TYPE,
  IBaseFunction,
  TTencentCosFunctionContent,
} from "@illa-public/public-types"
import { getInitBaseFunction } from "."

export const INIT_TENCENT_COS_FUNCTION_CONTENT: TTencentCosFunctionContent = {
  actionType: FUNCTION_ACTION_TYPE.GET_DOWNLOAD_URL,
  config: {
    objectName: "",
    versionID: "",
  },
}

export const getInitTencentCosFunction =
  (): IBaseFunction<TTencentCosFunctionContent> => {
    const baseFunction = getInitBaseFunction()

    return {
      ...baseFunction,
      resourceType: "tencentcos",
      content: INIT_TENCENT_COS_FUNCTION_CONTENT,
    }
  }
