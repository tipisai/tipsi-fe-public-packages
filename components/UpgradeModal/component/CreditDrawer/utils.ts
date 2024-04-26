import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  TeamInfo,
} from "@illa-public/public-types"
import { CREDIT_TYPE } from "../../interface"
import { isSubscribeForDrawer } from "../../utils"

export const getCurrentCreditType = (
  teamInfo: TeamInfo,
  currentSubscribeNum: number,
  cycle: SUBSCRIPTION_CYCLE,
) => {
  if (!teamInfo) {
    return CREDIT_TYPE.SUBSCRIBE
  }
  const teamSubscribeNum = teamInfo.credit.quantity
  const isSubScribe = isSubscribeForDrawer(teamInfo?.credit?.plan)
  const isCancelSubscribe =
    teamInfo?.credit?.plan === SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_CANCELED

  if (isCancelSubscribe) {
    return CREDIT_TYPE.MODIFY_SUBSCRIPTION
  } else if (!isSubScribe || teamSubscribeNum === 0) {
    return CREDIT_TYPE.SUBSCRIBE
  } else {
    if (cycle !== teamInfo.credit.cycle) {
      return CREDIT_TYPE.MODIFY_SUBSCRIPTION
    } else if (currentSubscribeNum > teamSubscribeNum) {
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
