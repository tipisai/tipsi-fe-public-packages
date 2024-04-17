import { BILLING_REPORT_FROM } from "../../constants"

export interface ModalShowProps {
  from: BILLING_REPORT_FROM
  visible?: boolean
  id?: string
}
