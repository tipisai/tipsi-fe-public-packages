import Icon from "@ant-design/icons"
import { Button, Divider, Drawer } from "antd"
import { FC } from "react"
import { CloseIcon } from "@illa-public/icon"
import { InviteByEmailMobile } from "../components/InviteByEmail/mobile"
import { InviteLinkMobile } from "../components/InviteByLink/mobile"
import { NewInviteMemberProps } from "../interface"
import { dividerStyle, inviteModalStyle } from "./style"

export const InviteMemberMobile: FC<NewInviteMemberProps> = (props) => {
  const { onClose, titleName, excludeUserRole } = props

  return (
    <Drawer
      css={inviteModalStyle}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      open={true}
      title={titleName}
      extra={
        <Button
          icon={<Icon component={CloseIcon} />}
          type="text"
          onClick={onClose}
        />
      }
    >
      <InviteLinkMobile
        excludeUserRole={excludeUserRole}
        redirectURL={props.redirectURL}
        onCopyInviteLink={props.onCopyInviteLink}
      />
      <Divider css={dividerStyle} />
      <InviteByEmailMobile
        excludeUserRole={excludeUserRole}
        redirectURL={props.redirectURL}
      />
    </Drawer>
  )
}
InviteMemberMobile.displayName = "InviteMemberMobile"
