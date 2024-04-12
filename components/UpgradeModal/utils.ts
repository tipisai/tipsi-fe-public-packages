import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { SUBSCRIBE_PLAN } from "@illa-public/public-types"
import { getILLACloudURL } from "@illa-public/utils"
import { BILLING_REPORT_FROM } from "./constants"
import { createCreditModal, createTeamLimitModal } from "./hook"
import { CreditModalType, FREE_TEAM_LIMIT_TYPE } from "./interface"

export function getSuccessRedirectWithParams(
  params: Record<string, string | number>,
): string {
  const redirectPath = "/landing/subscribed"
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&")

  return `${getILLACloudURL(window.customDomain)}${redirectPath}?${paramString}`
}

export const handleCreditPurchaseError = (
  e: unknown,
  modalType: CreditModalType,
) => {
  const creditModal = createCreditModal()
  if (
    isILLAAPiError(e) &&
    (e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_CREDIT ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_VOLUME ||
      e.data.errorFlag ===
        ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_AI_TOKEN_GENERAL ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_AUTO_CHARGE_CREDIT_FAILED ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_INSUFFICIENT_DRIVE_TRAFFIC ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_CREDIT_PAYMENT_FAILURE ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_TRAFFIC ||
      e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_VOLUME ||
      e.data.errorFlag ===
        ERROR_FLAG.ERROR_FLAG_AI_AGENT_MAX_TOKEN_OVER_CREDIT_BALANCE)
  ) {
    creditModal?.({
      modalType,
      from: BILLING_REPORT_FROM.RUN,
    })
    return true
  }
  return false
}

export const handleFreeTeamLimitError = (
  e: unknown,
  modalType: FREE_TEAM_LIMIT_TYPE,
) => {
  const limitTeamModal = createTeamLimitModal()
  if (
    isILLAAPiError(e) &&
    e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_OVER_MAX_FREE_TEAM_LIMIT
  ) {
    limitTeamModal?.({
      modalType,
    })
    return true
  }
  return false
}

export const isSubscribeForDrawer = (subscribePlan?: SUBSCRIBE_PLAN) => {
  return (
    subscribePlan === SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_INSUFFICIENT ||
    subscribePlan === SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID
  )
}
