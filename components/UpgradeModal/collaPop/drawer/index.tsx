import { FC, useEffect, useState } from "react"
import { CreditDrawer } from "../../component/CreditDrawer"
import { CreditDrawerShowProps } from "./interface"
import { collarDrawerStore } from "./store"

export const UpgradeCreditDrawer: FC = () => {
  const [drawer, setDrawer] = useState<CreditDrawerShowProps | null>(null)

  useEffect(() => {
    const listener = collarDrawerStore.subscribe(() => {
      setDrawer(collarDrawerStore.getModal())
    })
    return () => {
      collarDrawerStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!drawer) return null
  return (
    <CreditDrawer
      from={drawer.from}
      visible={drawer.visible}
      onCancel={() => {
        if (drawer.id) {
          collarDrawerStore.update({
            ...drawer,
            visible: false,
          })
        }
      }}
      subCycle={drawer.subCycle}
      afterClose={() => collarDrawerStore.remove()}
      onSuccessCallback={drawer.onSuccessCallback}
    />
  )
}

UpgradeCreditDrawer.displayName = "UpgradeCreditDrawer"
