import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { CREDIT_TYPE } from "../../interface"

export interface CreditDrawerShowProps {
  from: string
  visible?: boolean
  id: string
  onSuccessCallback?: (teamID: string, operationType: CREDIT_TYPE) => void
  subCycle?: SUBSCRIPTION_CYCLE
}
