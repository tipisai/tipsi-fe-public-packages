import { IBaseFunction } from "."

export enum FUNCTION_ACTION_TYPE {
  GET_DOWNLOAD_URL = "getDownloadURL",
  LIST = "list",
}

export interface IDownloadAnObjectConfig {
  objectName: string
  versionID: string
}

export interface IListObjectConfig {
  prefix: string
  delimiter: string
  maxKeys: string
}

export interface IDownloadAnObjectContent {
  actionType: FUNCTION_ACTION_TYPE.GET_DOWNLOAD_URL
  config: IDownloadAnObjectConfig
}

export interface IListObjectContent {
  actionType: FUNCTION_ACTION_TYPE.LIST
  config: IListObjectConfig
}

export type TTencentCosFunctionContent =
  | IDownloadAnObjectContent
  | IListObjectContent

export enum TENCENT_COS_ACTION_OPERATION {
  TENCENT_COS_LIST = "tencentcos/list",
  TENCENT_COS_DOWNLOAD = "tencentcos/download",
}

export interface ITencentCosFunction extends IBaseFunction {
  resourceType: "tencentcos"
  content: TTencentCosFunctionContent | {}
  actionOperation: TENCENT_COS_ACTION_OPERATION
}
