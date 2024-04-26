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
