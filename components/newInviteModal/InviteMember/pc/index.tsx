import { Flex, Modal } from "antd"
import { FC } from "react"
import { InviteByEmailPC } from "../components/InviteByEmail/pc"
import { InviteLinkPC } from "../components/InviteByLink/pc"
import { NewInviteMemberProps } from "../interface"

export const InviteMemberPC: FC<NewInviteMemberProps> = (props) => {
  return (
    <Modal
      onCancel={props.onClose}
      footer={false}
      maskClosable={false}
      open={true}
      title={props.titleName}
    >
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
