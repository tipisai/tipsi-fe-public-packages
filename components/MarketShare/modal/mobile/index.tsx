import { Drawer } from "antd"
import { FC } from "react"
import { createPortal } from "react-dom"
import { MarketplaceShareContentMobile } from "../.."
import { IMarketShareModalProps } from "../interface"
import { contentContainerStyle } from "./style"

export const MarketShareModalMobile: FC<IMarketShareModalProps> = (props) => {
  if (typeof document === "undefined") return null
  return createPortal(
    <Drawer
      placement="bottom"
      destroyOnClose
      footer={false}
      open={props.visible}
      onClose={props.onClose}
      styles={{
        header: {
          borderBottom: "unset",
        },
      }}
    >
      <div css={contentContainerStyle}>
        <MarketplaceShareContentMobile
          title={props.title}
          ID={props.ID}
          name={props.name}
        />
      </div>
    </Drawer>,
    document.body,
  )
}

MarketShareModalMobile.displayName = "MarketShareModalMobile"
