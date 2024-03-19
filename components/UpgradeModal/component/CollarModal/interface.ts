import { WooModalType } from "../../interface"

export interface CollarModalProps {
  visible?: boolean
  modalType: WooModalType
  from: string
  onCancel: () => void
  afterClose?: () => void
}

export interface ModalDetail {
  title: string
  desc: string[]
}
