import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { CREDIT_TYPE } from "../../interface"

export interface CreditDrawerProps {
  from: string
  subCycle?: SUBSCRIPTION_CYCLE
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
  onSuccessCallback?: (teamID: string, operationType: CREDIT_TYPE) => void
}
