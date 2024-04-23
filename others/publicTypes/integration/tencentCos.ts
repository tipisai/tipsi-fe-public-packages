import { IBaseIntegration } from "."

export type TTencentCosRegion =
  | "ap-beijing-1"
  | "ap-beijing"
  | "ap-nanjing"
  | "ap-shanghai"
  | "ap-guangzhou"
  | "ap-chengdu"
  | "ap-chongqing"
  | "ap-shenzhen-fsi"
  | "ap-shanghai-fsi"
  | "ap-beijing-fsi"
  | "ap-hongkong"
  | "ap-singapore"
  | "ap-mumbai"
  | "ap-jakarta"
  | "ap-seoul"
  | "ap-bangkok"
  | "ap-tokyo"
  | "na-siliconvalley"
  | "na-ashburn"
  | "na-toronto"
  | "sa-saopaulo"
  | "eu-frankfurt"

export interface ITencentCosIntegrationContent {
  accessKeyID: string
  secretAccessKey: string
  bucketName: string
  region: TTencentCosRegion
}

export interface ITencentCosIntegration
  extends IBaseIntegration<ITencentCosIntegrationContent> {
  resourceType: "tencentcos"
}
