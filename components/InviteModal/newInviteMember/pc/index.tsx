import { Flex, Modal, Tabs } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { InviteByEmailPC } from "../components/InviteByEmail/pc"
import { InviteLinkPC } from "../components/InviteByLink/pc"
import { NewInviteMemberProps } from "../interface"
import { headerContainerStyle } from "./style"

export const InviteMemberPC: FC<NewInviteMemberProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Modal
      onCancel={props.onClose}
      footer={false}
      maskClosable={false}
      open={true}
      title={null}
    >
      <div css={headerContainerStyle}>
        <Tabs
          items={[
            {
              label: t("user_management.modal.title.invite_members"),
              key: t("user_management.modal.title.invite_members"),
            },
          ]}
        />
      </div>
      <Flex vertical gap="small">
        <InviteLinkPC
          excludeUserRole={[]}
          redirectURL={props.redirectURL}
          onCopyInviteLink={props.onCopyInviteLink}
        />
        <InviteByEmailPC redirectURL={props.redirectURL} excludeUserRole={[]} />
      </Flex>
    </Modal>
  )
}

InviteMemberPC.displayName = "InviteMemberPC"
