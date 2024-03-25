import { v4 } from "uuid"
import { ModalStore, ModalStoreHandler, SubListener } from "../../interface"
import { CreditDrawerShowProps } from "./interface"

const collarDrawerState = {
  listener: [],
  modal: null,
} as ModalStore<CreditDrawerShowProps>

function createCollarDrawerStore(): ModalStoreHandler<CreditDrawerShowProps> {
  return {
    getModal: () => {
      return collarDrawerState.modal
    },
    setModal: (modal: CreditDrawerShowProps) => {
      collarDrawerState.modal = modal
      collarDrawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      collarDrawerState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      collarDrawerState.listener.splice(
        collarDrawerState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modal) => {
      collarDrawerState.modal = modal
      collarDrawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: () => {
      collarDrawerState.modal = null
      collarDrawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
  } as ModalStoreHandler<CreditDrawerShowProps>
}

export const collarDrawerStore = createCollarDrawerStore()
