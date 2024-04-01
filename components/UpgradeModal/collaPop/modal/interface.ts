import { BILLING_REPORT_FROM } from "../../constants"
import { CreditModalType } from "../../interface"

export interface ModalShowProps {
  from: BILLING_REPORT_FROM
  visible?: boolean
  id?: string
  modalType: CreditModalType
}
