import Icon from "@ant-design/icons"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { Button, Modal } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FREE_TEAM_LIMIT_TYPE } from "../../interface"
import { MODAL_TEXT } from "./constants"
import {
  descStyle,
  modalCloseIconStyle,
  parErrorContainerStyle,
  titleStyle,
} from "./style"

interface TeamLimitModalProps {
  modalType: FREE_TEAM_LIMIT_TYPE
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
}

export const TeamLimitModal: FC<TeamLimitModalProps> = ({
  visible,
  modalType,
  onCancel,
  afterClose,
}) => {
  const { t } = useTranslation()
  const { title, desc, buttonText } = MODAL_TEXT[modalType]
  return (
    <Modal
      open={visible}
      footer={false}
      onCancel={onCancel}
      afterClose={afterClose}
      maskClosable
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
        footer: {
          margin: 0,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
      closeIcon={false}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <Icon component={CloseIcon} />
      </div>
      <div css={parErrorContainerStyle}>
        <span css={titleStyle}>{t(title)}</span>
        <span css={descStyle}>{t(desc)}</span>
        <Button size="large" type="primary" onClick={() => onCancel?.()}>
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}
