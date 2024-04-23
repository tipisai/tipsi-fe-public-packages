import { TIntegrationType } from "@illa-public/public-types"

export function getResourceNameFromResourceType(
  resourceType: TIntegrationType,
): string {
  switch (resourceType) {
    case "tencentCos":
      return "Tencent Cloud"
    case "larkBot":
      return "Lark Bot"
    default:
      return ""
  }
}
