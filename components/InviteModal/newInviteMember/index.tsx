import { FC } from "react"
import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { NewInviteMemberProps } from "./interface"
import { InviteMemberMobile } from "./mobile"
import { InviteMemberPC } from "./pc"

const InviteMember: FC<NewInviteMemberProps> = (props) => {
  const { onClose, onCopyInviteLink, redirectURL } = props
  return (
    <LayoutAutoChange
      desktopPage={
        <InviteMemberPC
          redirectURL={redirectURL}
          onCopyInviteLink={onCopyInviteLink}
          onClose={onClose}
        />
      }
      mobilePage={
        <InviteMemberMobile
          redirectURL={redirectURL}
          onCopyInviteLink={onCopyInviteLink}
          onClose={onClose}
        />
      }
    />
  )
}

export default InviteMember
