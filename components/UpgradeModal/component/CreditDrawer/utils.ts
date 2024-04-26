import { SUBSCRIBE_PLAN, TeamInfo } from "@illa-public/public-types"
import { CREDIT_TYPE } from "../../interface"

export const getCurrentCreditType = (
  teamSubscribeNum: number,
  currentSubscribeNum: number,
  isCanceled?: boolean,
) => {
  if (isCanceled) {
    return CREDIT_TYPE.MODIFY_SUBSCRIPTION
  }
  if (teamSubscribeNum === 0) {
    return CREDIT_TYPE.SUBSCRIBE
  } else {
    if (currentSubscribeNum > teamSubscribeNum) {
      return CREDIT_TYPE.ADD_CREDIT
    } else if (currentSubscribeNum === 0) {
      return CREDIT_TYPE.CANCEL_SUBSCRIPTION
    } else if (currentSubscribeNum < teamSubscribeNum) {
      return CREDIT_TYPE.REMOVE_CREDIT
    } else {
      return CREDIT_TYPE.SUBSCRIBE
    }
  }
}

export const getDefaultQuantity = (teamInfo: TeamInfo) => {
  const isCancelSubscribe =
    teamInfo?.credit?.plan === SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_CANCELED

  if (isCancelSubscribe) {
    return teamInfo?.credit.quantity ?? 0
  } else if (teamInfo.credit.balanceConverted < 0) {
    const minNum = Math.floor(
      (teamInfo.credit.volumeConverted - teamInfo.credit.balanceConverted) /
        5000,
    )
    return minNum
  } else {
    return teamInfo?.credit?.quantity ?? 0
  }
}
