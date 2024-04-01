import { v4 } from "uuid"
import { BILLING_REPORT_FROM } from "../../constants"
import { CreditDrawerShowProps } from "./interface"
import { collarDrawerStore } from "./store"

// collar
const showCreditDrawerImpl = (
  from: BILLING_REPORT_FROM,
  config?: Pick<CreditDrawerShowProps, "onSuccessCallback" | "subCycle">,
) => {
  let drawer: CreditDrawerShowProps = {
    id: v4(),
    from,
    subCycle: config?.subCycle,
    onSuccessCallback: config?.onSuccessCallback,
  }

  if (!drawer.visible) {
    drawer.visible = true
  }
  collarDrawerStore.setModal(drawer)
  return drawer.id
}

const collarDrawerHandler = (
  from: BILLING_REPORT_FROM,
  config?: Pick<CreditDrawerShowProps, "onSuccessCallback" | "subCycle">,
) => {
  return showCreditDrawerImpl(from, config)
}

export function useCreditDrawer() {
  return collarDrawerHandler
}

export const createCreditDrawer = useCreditDrawer
