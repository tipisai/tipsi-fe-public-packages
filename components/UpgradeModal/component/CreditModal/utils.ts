import { CreditModalType } from "../../interface"
import { ModalDetail } from "./interface"

export const getUnitDetailByPrice = (type: CreditModalType): ModalDetail => {
  switch (type) {
    case CreditModalType.STORAGE:
      return {
        title: "billing.modal.colla_insufficient_modal.storage.title",
        desc: [
          "billing.modal.colla_insufficient_modal.storage.desc.1",
          "billing.modal.colla_insufficient_modal.storage.desc.2",
        ],
      }
    case CreditModalType.TRAFFIC:
      return {
        title: "billing.modal.colla_insufficient_modal.traffic.title",
        desc: [
          "billing.modal.colla_insufficient_modal.traffic.desc.1",
          "billing.modal.colla_insufficient_modal.traffic.desc.2",
        ],
      }
    default:
    case CreditModalType.TOKEN:
      return {
        title: "billing.modal.colla_insufficient_modal.token.title",
        desc: [
          "billing.modal.colla_insufficient_modal.token.desc.1",
          "billing.modal.colla_insufficient_modal.token.desc.2",
        ],
      }
  }
}
