import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { CREDIT_TYPE, CREDIT_UNIT_BY_CYCLE, CREDIT_UNIT_PRICE } from "../.."
import { isSubscribeForDrawer, toThousands } from "../../utils"
import { getCurrentCreditType } from "./utils"

export const useGetUIState = (
  currentQuantity: number,
  cycle: SUBSCRIPTION_CYCLE,
) => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const isSubScribe = isSubscribeForDrawer(currentTeamInfo?.credit?.plan)

  const teamQuantity = isSubScribe ? currentTeamInfo?.credit?.quantity ?? 0 : 0

  const changeNum = Math.abs(teamQuantity - currentQuantity)

  const paymentOptions = [
    {
      label: t("tipi_billing.annual"),
      value: SUBSCRIPTION_CYCLE.YEARLY,
    },
    {
      label: t("tipi_billing.monthly"),
      value: SUBSCRIPTION_CYCLE.MONTHLY,
    },
  ]

  const { btnText, description } = useMemo(() => {
    const num = `${toThousands(changeNum * CREDIT_UNIT_BY_CYCLE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY])}`
    if (currentTeamInfo?.credit?.cycle !== cycle && isSubScribe) {
      return {
        btnText: t("tipi_billing.change_plan", {
          changeNum: num,
        }),
        description: t("tipi_billing.change_desc", {
          changeNum: num,
        }),
      }
    } else {
      const type = getCurrentCreditType(
        currentTeamInfo,
        currentQuantity ?? 1,
        cycle,
      )
      switch (type) {
        case CREDIT_TYPE.ADD_CREDIT:
          return {
            btnText: t("tipi_billing.increase", {
              changeNum: num,
            }),
            description: t("tipi_billing.increase_desc", {
              changeNum: num,
            }),
          }
        case CREDIT_TYPE.REMOVE_CREDIT:
          return {
            btnText: t("tipi_billing.remove", {
              changeNum: num,
            }),
            description: t("tipi_billing.reduce_desc", {
              changeNum: num,
            }),
          }
        case CREDIT_TYPE.CANCEL_SUBSCRIPTION:
          return {
            btnText: t("tipi_billing.unsubscribe", {
              changeNum: num,
            }),
            description: t("tipi_billing.unsub_desc", {
              changeNum: num,
            }),
          }
        default:
        case CREDIT_TYPE.SUBSCRIBE:
          return {
            btnText: t("tipi_billing.subscribe", {
              changeNum: num,
            }),
            description: t("tipi_billing.sub_desc", {
              changeNum: num,
            }),
          }
      }
    }
  }, [changeNum, currentQuantity, currentTeamInfo, cycle, isSubScribe, t])

  return {
    paymentOptions,
    btnText,
    description,
  }
}

export const useGetDataState = (
  currentQuantity: number,
  cycle: SUBSCRIPTION_CYCLE,
) => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const isSubScribe = isSubscribeForDrawer(currentTeamInfo?.credit?.plan)

  const teamQuantity = isSubScribe ? currentTeamInfo?.credit?.quantity ?? 0 : 0

  const changeNum = Math.abs(teamQuantity - currentQuantity)

  const isCancelSubscribe =
    currentTeamInfo?.credit?.plan === SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_CANCELED

  const disabledSubscribe =
    (currentQuantity === teamQuantity &&
      cycle === currentTeamInfo?.credit?.cycle) ||
    (currentQuantity === 0 && cycle !== currentTeamInfo?.credit?.cycle)

  const unitPrice = CREDIT_UNIT_PRICE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]

  const unitCreditByCycle =
    CREDIT_UNIT_BY_CYCLE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]

  const calculatorNum =
    currentTeamInfo?.credit?.cycle === cycle ? changeNum : currentQuantity

  const hiddenCalculator =
    currentQuantity === 0 ||
    // not modify cycle
    (changeNum === 0 && currentTeamInfo?.credit?.cycle === cycle)
  // not cancel subscribe
  getCurrentCreditType(currentTeamInfo, currentQuantity, cycle) !==
    CREDIT_TYPE.CANCEL_SUBSCRIPTION

  return {
    disabledSubscribe,
    isCancelSubscribe,
    unitPrice,
    unitCreditByCycle,
    calculatorNum,
    hiddenCalculator,
  }
}
