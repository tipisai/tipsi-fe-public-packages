import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { IMarketShareModalProps } from "./interface"
import { MarketShareModalMobile } from "./mobile"
import { MarketShareModalPC } from "./pc"

export const MarketShareModal: FC<IMarketShareModalProps> = (props) => {
  return (
    <LayoutAutoChange
      desktopPage={<MarketShareModalPC {...props} />}
      mobilePage={<MarketShareModalMobile {...props} />}
    />
  )
}

MarketShareModal.displayName = "MarketShareModal"
