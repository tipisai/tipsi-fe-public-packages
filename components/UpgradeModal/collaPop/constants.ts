import { CreditModalType } from "../interface"

export const OPERATION_NO_PERMISSION = {
  [CreditModalType.STORAGE]: "billing.message.no_storage",
  [CreditModalType.TRAFFIC]: "billing.message.no_traffic",
  [CreditModalType.TOKEN]: "billing.message.no_token",
}
