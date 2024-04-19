import { Modal } from "antd"
import { FC } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { MarketplaceContentPC } from "../.."
import { IMarketShareModalProps } from "../interface"
import { contentContainerStyle, headerContainerStyle } from "./style"

export const MarketShareModalPC: FC<IMarketShareModalProps> = (props) => {
  const { t } = useTranslation()

  if (typeof document === "undefined") return null
  return createPortal(
    <Modal
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      open={props.visible}
      centered
    >
      <span css={headerContainerStyle}>
        {t("user_management.modal.title.share_agent")}
      </span>
      <div css={contentContainerStyle}>
        <MarketplaceContentPC {...props} />
      </div>
    </Modal>,
    document.body,
  )
}

MarketShareModalPC.displayName = "MarketShareModalPC"
