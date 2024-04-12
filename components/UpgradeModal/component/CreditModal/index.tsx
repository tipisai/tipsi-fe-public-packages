import Icon from "@ant-design/icons"
import { Button, Modal } from "antd"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon, UpgradeIcon } from "@illa-public/icon"
import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { TipisTrack } from "@illa-public/track-utils"
import { useCreditDrawer } from "../../hook"
import { CREDIT_UNIT_PRICE } from "../../service/interface"
import CreditBg from "./assets/collarBg.svg?react"
import { CreditModalProps } from "./interface"
import {
  decorateStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  modalCloseIconStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
} from "./style"

export const CreditModal: FC<CreditModalProps> = (props) => {
  const { visible, from, onCancel, afterClose } = props
  const { t } = useTranslation()
  const creditDrawer = useCreditDrawer()

  const handleClick = () => {
    onCancel?.()
    creditDrawer(from)
  }

  useEffect(() => {
    if (visible) {
      TipisTrack.track("show_billing_modal", {
        parameter1: from,
      })
    }
  }, [from, visible])

  return (
    <Modal
      open={visible}
      maskClosable={false}
      footer={false}
      centered
      styles={{
        content: {
          padding: 0,
          width: "100%",
          maxWidth: 486,
          boxShadow: "0 4px 16px rgb(0 0 0 / 8%)",
          border: `1px solid ${getColor("grayBlue", "08")}`,
          overflow: "hidden",
          borderRadius: 8,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
      closeIcon={false}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <Icon component={CloseIcon} />
      </div>
      <CreditBg css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>
          {t("billing.modal.colla_insufficient_modal.token.title")}
        </div>
        <div css={descriptionStyle}>
          {t("billing.modal.colla_insufficient_modal.token.desc.1")}
        </div>
      </div>
      <div>
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>
              {`$${CREDIT_UNIT_PRICE[SUBSCRIPTION_CYCLE.MONTHLY]}`}
            </div>
            <div css={priceContentStyle}>
              {t("billing.modal.colla_insufficient_modal.cycle")}
            </div>
          </div>
          <Button
            size="large"
            type="primary"
            icon={<UpgradeIcon />}
            onClick={handleClick}
          >
            {t("billing.modal.colla_insufficient_modal.button")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

CreditModal.displayName = "CreditModal"
