import { WOO_TYPE } from "../../interface"
import { WOO_BUTTON_TEXT, WOO_MORE_TEXT } from "./constants"

export const getCurrentCollarType = (
  teamSubscribeNum: number,
  currentSubscribeNum: number,
  isCanceled?: boolean,
) => {
  if (isCanceled) {
    return WOO_TYPE.MODIFY_SUBSCRIPTION
  }
  if (teamSubscribeNum === 0) {
    return WOO_TYPE.SUBSCRIBE
  } else {
    if (currentSubscribeNum > teamSubscribeNum) {
      return WOO_TYPE.ADD_WOO
    } else if (currentSubscribeNum === 0) {
      return WOO_TYPE.CANCEL_SUBSCRIPTION
    } else if (currentSubscribeNum < teamSubscribeNum) {
      return WOO_TYPE.REMOVE_WOO
    } else {
      return WOO_TYPE.SUBSCRIBE
    }
  }
}

export const getDescription = (currentCollarType: WOO_TYPE) => {
  switch (currentCollarType) {
    case WOO_TYPE.ADD_WOO:
      return WOO_MORE_TEXT.ADD_WOO
    case WOO_TYPE.REMOVE_WOO:
      return WOO_MORE_TEXT.REMOVE_WOO
    case WOO_TYPE.CANCEL_SUBSCRIPTION:
      return WOO_MORE_TEXT.CANCEL_SUBSCRIPTION
    default:
    case WOO_TYPE.SUBSCRIBE:
      return WOO_MORE_TEXT.SUBSCRIBE
  }
}

export const getBtnText = (currentCollarType: WOO_TYPE) => {
  if (currentCollarType === WOO_TYPE.SUBSCRIBE) {
    return WOO_BUTTON_TEXT.SUBSCRIBE
  } else if (currentCollarType === WOO_TYPE.ADD_WOO) {
    return WOO_BUTTON_TEXT.ADD_WOO
  } else if (currentCollarType === WOO_TYPE.REMOVE_WOO) {
    return WOO_BUTTON_TEXT.REMOVE_WOO
  } else if (currentCollarType === WOO_TYPE.CANCEL_SUBSCRIPTION) {
    return WOO_BUTTON_TEXT.CANCEL_SUBSCRIPTION
  } else {
    return WOO_BUTTON_TEXT.SUBSCRIBE
  }
}
