import Icon from "@ant-design/icons"
import { Divider, Drawer } from "antd"
import { FC } from "react"
import { CloseIcon } from "@illa-public/icon"
import { InviteByEmailMobile } from "../components/InviteByEmail/mobile"
// import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../components/InviteByLink/mobile"
import { NewInviteMemberProps } from "../interface"
import {
  closeIconContainerStyle,
  dividerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const InviteMemberMobile: FC<NewInviteMemberProps> = (props) => {
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
          onCopyInviteLink={props.onCopyInviteLink}
        />
        <Divider css={dividerStyle} />
        <InviteByEmailMobile
          excludeUserRole={[]}
          redirectURL={props.redirectURL}
        />
      </div>
    </Drawer>
  )
}
InviteMemberMobile.displayName = "InviteMemberMobile"
