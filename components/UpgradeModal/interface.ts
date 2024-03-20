export interface ModalStoreHandler<T> {
  getModal: () => T
  setModal: (modal: T) => void
  subscribe: (onStoreChange: () => void) => SubListener
  unSubscribe: (listenerId: string) => void
  remove: () => void
  update: (modal: T) => void
}

export interface ModalHandler<T> {
  (modal: T): string
}

export interface ModalStore<T> {
  listener: SubListener[]
  modal: T | null
}

export interface SubListener {
  listenerId: string
  onStoreChange: () => void
}

export enum WooModalType {
  STORAGE = "storage",
  TOKEN = "token",
  TRAFFIC = "traffic",
}

export enum WOO_TYPE {
  SUBSCRIBE = "subscribe",
  ADD_WOO = "addCollar",
  REMOVE_WOO = "removeCollar",
  CANCEL_SUBSCRIPTION = "cancelSubscription",
  MODIFY_SUBSCRIPTION = "modifySubscription",
}

export enum FREE_TEAM_LIMIT_TYPE {
  CREATE = "create",
  TRANSFER_OWNER = "transferOwner",
}

export enum PURCHASE_TYPE {
  WOO = "woo",
}
