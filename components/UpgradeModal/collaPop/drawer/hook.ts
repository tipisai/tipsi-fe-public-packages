import { v4 } from "uuid"
import { WooDrawerShowProps } from "./interface"
import { collarDrawerStore } from "./store"

// collar
const showCollarDrawerImpl = (
  from: string,
  config?: Pick<WooDrawerShowProps, "onSuccessCallback" | "subCycle">,
) => {
  let drawer: WooDrawerShowProps = {
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
  from: string,
  config?: Pick<WooDrawerShowProps, "onSuccessCallback" | "subCycle">,
) => {
  return showCollarDrawerImpl(from, config)
}

export function useCollarDrawer() {
  return collarDrawerHandler
}

export const createCollarDrawer = useCollarDrawer
