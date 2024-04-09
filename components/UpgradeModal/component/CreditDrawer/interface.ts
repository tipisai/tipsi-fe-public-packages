import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { BILLING_REPORT_FROM } from "../../constants"
import { CREDIT_TYPE } from "../../interface"

export interface CreditDrawerProps {
  from: BILLING_REPORT_FROM
  subCycle?: SUBSCRIPTION_CYCLE
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
  onSuccessCallback?: (teamID: string, operationType: CREDIT_TYPE) => void
}
