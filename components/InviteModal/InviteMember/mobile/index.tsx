import Icon from "@ant-design/icons"
import { CloseIcon } from "@illa-public/icon"
import { Divider, Drawer } from "antd"
import { FC } from "react"
import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../../component/InviteLink/mobile"
import { InviteMemberProps } from "../interface"
import {
  closeIconContainerStyle,
  dividerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const InviteMemberMobile: FC<InviteMemberProps> = (props) => {
  const { onClose } = props

  return (
    <Drawer
      css={inviteModalStyle}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      onClose={onClose}
      open={true}
    >
      <div css={inviteHeaderContainerStyle}>
        <div
          css={closeIconContainerStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <Icon component={CloseIcon} />
        </div>
      </div>
      <div>
        <InviteLinkMobile
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
        <Divider css={dividerStyle} />
        <InviteByEmailMobile
          itemID={props.itemID}
          onInvitedChange={props.onInvitedChange}
          excludeUserRole={[]}
          redirectURL={props.redirectURL}
          defaultInviteUserRole={props.defaultInviteUserRole}
          teamID={props.teamID}
          currentUserRole={props.currentUserRole}
          defaultBalance={props.defaultBalance}
          onBalanceChange={props.onBalanceChange}
        />
      </div>
    </Drawer>
  )
}
InviteMemberMobile.displayName = "InviteMemberMobile"
