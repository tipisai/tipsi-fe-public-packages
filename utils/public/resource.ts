import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { TIntegrationType } from "@illa-public/public-types"

export const useGetResourceNameFormResourceType = () => {
  const { t } = useTranslation()

  const getResourceNameFromResourceType = useCallback(
    (resourceType: TIntegrationType) => {
      switch (resourceType) {
        case "tencentcos":
          return t("editor.action.form.title.tx.tencent")
        case "larkim":
          return "Lark Bot"
        default:
          return ""
      }
    },
    [t],
  )

  return getResourceNameFromResourceType
}
