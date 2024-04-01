import { BILLING_REPORT_FROM } from "../../constants"
import { CreditModalType } from "../../interface"

export interface CreditModalProps {
  visible?: boolean
  modalType: CreditModalType
  from: BILLING_REPORT_FROM
  onCancel: () => void
  afterClose?: () => void
}

export interface ModalDetail {
  title: string
  desc: string[]
}
