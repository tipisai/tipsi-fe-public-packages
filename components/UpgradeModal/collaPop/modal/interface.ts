import { WooModalType } from "../../interface"

export interface ModalShowProps {
  from: string
  visible?: boolean
  id?: string
  modalType: WooModalType
}
