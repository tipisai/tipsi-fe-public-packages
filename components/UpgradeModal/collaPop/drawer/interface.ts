import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { WOO_TYPE } from "../../interface"

export interface CollarDrawerShowProps {
  from: string
  visible?: boolean
  id: string
  onSuccessCallback?: (teamID: string, operationType: WOO_TYPE) => void
  subCycle?: SUBSCRIPTION_CYCLE
}
