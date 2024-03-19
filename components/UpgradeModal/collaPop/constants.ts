import { WooModalType } from "../interface"

export const OPERATION_NO_PERMISSION = {
  [WooModalType.STORAGE]: "billing.message.no_storage",
  [WooModalType.TRAFFIC]: "billing.message.no_traffic",
  [WooModalType.TOKEN]: "billing.message.no_token",
}
