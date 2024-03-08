import Icon from "@ant-design/icons"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { Button, Modal } from "antd"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { INSUFFICIENT_MODAL_CONFIG_KEY } from "./constants"
import { InsufficientNoticeModalProps } from "./interface"
import {
  actionAreaStyle,
  descriptionStyle,
  modalCloseIconStyle,
  titleStyle,
} from "./style"

export const InsufficientNoticeModal: FC<InsufficientNoticeModalProps> = (
  props,
) => {
  const { visible, configType = "add-license", onCancel, afterClose } = props
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return INSUFFICIENT_MODAL_CONFIG_KEY[configType] ?? {}
  }, [configType])

  return (
    <Modal
      styles={{
        content: {
          padding: 0,
          width: "100%",
          maxWidth: 320,
          boxShadow: "0 4px 16px rgb(0 0 0 / 8%)",
          border: `1px solid ${getColor("grayBlue", "08")}`,
          overflow: "hidden",
          borderRadius: 4,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
      centered
      closeIcon={false}
      maskClosable={false}
      footer={false}
      open={visible}
      afterClose={afterClose}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <Icon component={CloseIcon} width="12px" height="12px" />
      </div>
      <div css={titleStyle}>{t(title)}</div>
      <div css={descriptionStyle}>{t(description)}</div>
      <div css={actionAreaStyle}>
        <Button type="primary" onClick={onCancel}>
          {t(buttonText)}
        </Button>
      </div>
    </Modal>
  )
}

InsufficientNoticeModal.displayName = "InsufficientNoticeModal"
