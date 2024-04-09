import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { BILLING_REPORT_FROM } from "../../constants"
import { CREDIT_TYPE } from "../../interface"

export interface CreditDrawerShowProps {
  from: BILLING_REPORT_FROM
  visible?: boolean
  id: string
  onSuccessCallback?: (teamID: string, operationType: CREDIT_TYPE) => void
  subCycle?: SUBSCRIPTION_CYCLE
}
