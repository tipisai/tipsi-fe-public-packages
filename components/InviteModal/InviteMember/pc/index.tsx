import { Flex, Modal, Tabs } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon } from "@illa-public/icon"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { InviteMemberProps } from "../interface"
import { closeIconStyle, headerContainerStyle } from "./style"

export const InviteMemberPC: FC<InviteMemberProps> = (props) => {
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
          defaultInviteUserRole={props.defaultInviteUserRole}
          defaultAllowInviteLink={props.defaultAllowInviteLink}
          teamID={props.teamID}
          currentUserRole={props.currentUserRole}
          onInviteLinkStateChange={props.onInviteLinkStateChange}
          onCopyInviteLink={props.onCopyInviteLink}
          defaultBalance={props.defaultBalance}
        />
        <InviteByEmailPC
          itemID={props.itemID}
          excludeUserRole={[]}
          redirectURL={props.redirectURL}
          defaultInviteUserRole={props.defaultInviteUserRole}
          teamID={props.teamID}
          currentUserRole={props.currentUserRole}
          defaultBalance={props.defaultBalance}
          onBalanceChange={props.onBalanceChange}
          onInvitedChange={props.onInvitedChange}
        />
      </Flex>
    </Modal>
  )
}

InviteMemberPC.displayName = "InviteMemberPC"
