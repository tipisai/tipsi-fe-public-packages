import { CreditModalType } from "../../interface"

export interface CreditModalProps {
  visible?: boolean
  modalType: CreditModalType
  from: string
  onCancel: () => void
  afterClose?: () => void
}

export interface ModalDetail {
  title: string
  desc: string[]
}
