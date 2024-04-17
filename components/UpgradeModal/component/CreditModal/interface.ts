import { BILLING_REPORT_FROM } from "../../constants"

export interface CreditModalProps {
  visible?: boolean
  from: BILLING_REPORT_FROM
  onCancel: () => void
  afterClose?: () => void
}

export interface ModalDetail {
  title: string
  desc: string[]
}
