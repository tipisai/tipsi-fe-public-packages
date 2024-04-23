import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { TIntegrationType } from "@illa-public/public-types"

export function getResourceNameFromResourceType(
  resourceType: TIntegrationType,
): string {
  switch (resourceType) {
    case "tencentcos":
      return "Tencent Cloud"
    case "larkBot":
      return "Lark Bot"
    default:
      return ""
  }
}

export const useGetResourceNameFormResourceType = () => {
  const { t } = useTranslation()

  const getResourceNameFromResourceType = useCallback(
    (resourceType: TIntegrationType) => {
      switch (resourceType) {
        case "tencentcos":
          return t("editor.action.form.title.tx.tencent")
        case "larkBot":
          return "Lark Bot"
        default:
          return ""
      }
    },
    [t],
  )

  return getResourceNameFromResourceType
}
