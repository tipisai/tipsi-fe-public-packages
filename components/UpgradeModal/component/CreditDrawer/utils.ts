import { CREDIT_TYPE } from "../../interface"
import { CREDIT_BUTTON_TEXT, CREDIT_MORE_TEXT } from "./constants"

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

export const getDescription = (currentCreditType: CREDIT_TYPE) => {
  switch (currentCreditType) {
    case CREDIT_TYPE.ADD_CREDIT:
      return CREDIT_MORE_TEXT.ADD_CREDIT
    case CREDIT_TYPE.REMOVE_CREDIT:
      return CREDIT_MORE_TEXT.REMOVE_CREDIT
    case CREDIT_TYPE.CANCEL_SUBSCRIPTION:
      return CREDIT_MORE_TEXT.CANCEL_SUBSCRIPTION
    default:
    case CREDIT_TYPE.SUBSCRIBE:
      return CREDIT_MORE_TEXT.SUBSCRIBE
  }
}

export const getBtnText = (currentCreditType: CREDIT_TYPE) => {
  if (currentCreditType === CREDIT_TYPE.SUBSCRIBE) {
    return CREDIT_BUTTON_TEXT.SUBSCRIBE
  } else if (currentCreditType === CREDIT_TYPE.ADD_CREDIT) {
    return CREDIT_BUTTON_TEXT.ADD_CREDIT
  } else if (currentCreditType === CREDIT_TYPE.REMOVE_CREDIT) {
    return CREDIT_BUTTON_TEXT.REMOVE_CREDIT
  } else if (currentCreditType === CREDIT_TYPE.CANCEL_SUBSCRIPTION) {
    return CREDIT_BUTTON_TEXT.CANCEL_SUBSCRIPTION
  } else {
    return CREDIT_BUTTON_TEXT.SUBSCRIBE
  }
}
