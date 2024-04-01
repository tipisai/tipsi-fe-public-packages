import Icon from "@ant-design/icons"
import { Button, Modal } from "antd"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { FREE_TEAM_LIMIT_TYPE } from "../../interface"
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

  const { title, desc, buttonText } = useMemo(() => {
    switch (modalType) {
      case FREE_TEAM_LIMIT_TYPE.CREATE:
        return {
          title: t("page.workspace.modal.free_team.cannot_transfer.title"),
          desc: t("page.workspace.modal.free_team.cannot_transfer.desc"),
          buttonText: t("page.workspace.modal.free_team.cannot_create.button"),
        }
      default:
      case FREE_TEAM_LIMIT_TYPE.CREATE:
        return {
          title: t("page.workspace.modal.free_team.cannot_create.title"),
          desc: t("page.workspace.modal.free_team.cannot_create.desc"),
          buttonText: t("page.workspace.modal.free_team.cannot_create.button"),
        }
    }
  }, [modalType, t])
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
