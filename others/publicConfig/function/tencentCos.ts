import {
  FUNCTION_ACTION_TYPE,
  IBaseFunction,
  TTencentCosFunctionContent,
} from "@illa-public/public-types"

export const INIT_TENCENT_COS_FUNCTION: IBaseFunction<TTencentCosFunctionContent> =
  {
    name: "",
    description: "",
    config: {
      icon: "",
      variables: [],
    },
    resourceID: "",
    content: {
      actionType: FUNCTION_ACTION_TYPE.GET_DOWNLOAD_URL,
      config: {
        objectName: "",
        versionID: "",
      },
    },
    type: "tencentcos",
  }
