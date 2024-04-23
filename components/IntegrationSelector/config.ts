import { TIntegrationType } from "@illa-public/public-types"

export interface ResourceItem {
  resourceType: TIntegrationType
  hidden?: boolean
}

export const Apis: ResourceItem[] = [
  {
    resourceType: "tencentCos",
  },
]
