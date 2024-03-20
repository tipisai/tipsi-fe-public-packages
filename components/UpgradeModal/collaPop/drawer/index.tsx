import { FC, useEffect, useState } from "react"
import { CollarDrawer } from "../../component/CollarDrawer"
import { WooDrawerShowProps } from "./interface"
import { collarDrawerStore } from "./store"

export const UpgradeCollarDrawer: FC = () => {
  const [drawer, setDrawer] = useState<WooDrawerShowProps | null>(null)

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
    <CollarDrawer
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

UpgradeCollarDrawer.displayName = "UpgradeCollarDrawer"
