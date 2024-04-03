import { FC } from "react"
import { useTranslation } from "react-i18next"
import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { NewInviteMemberProps } from "./interface"
import { InviteMemberMobile } from "./mobile"
import { InviteMemberPC } from "./pc"

export const InviteMember: FC<NewInviteMemberProps> = (props) => {
  const { t } = useTranslation()
  const {
    onClose,
    onCopyInviteLink,
    redirectURL,
    titleName = t("user_management.modal.title.invite_members"),
  } = props
  return (
    <LayoutAutoChange
      desktopPage={
        <InviteMemberPC
          redirectURL={redirectURL}
          onCopyInviteLink={onCopyInviteLink}
          onClose={onClose}
          titleName={titleName}
        />
      }
      mobilePage={
        <InviteMemberMobile
          redirectURL={redirectURL}
          onCopyInviteLink={onCopyInviteLink}
          onClose={onClose}
          titleName={titleName}
        />
      }
    />
  )
}
