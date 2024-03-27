import { v4 } from "uuid"
import { ModalHandler } from "../../interface"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

const showCreditModalImpl = (modal: ModalShowProps) => {
  if (!modal.id) {
    modal.id = v4()
  }
  if (!modal.visible) {
    modal.visible = true
  }
  modalStore.setModal(modal)
  return modal.id
}

const collarModalHandler = (type: ModalShowProps) => {
  return showCreditModalImpl(type)
}

export function useCreditModal(): ModalHandler<ModalShowProps> {
  return collarModalHandler
}

export const createCreditModal = useCreditModal
