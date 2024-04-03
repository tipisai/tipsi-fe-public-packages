import { App, Button } from "antd"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { RoleSelector } from "@illa-public/role-selector"
import {
  useChangeTeamInviteLinkEnabledMutation,
  useGetInviteLinkQuery,
} from "@illa-public/user-data"
import DisableInviteIcon from "../../../../asset/DisableInviteLink.svg?react"
import InviteIcon from "../../../../asset/InviteLink.svg?react"
import { InviteMemberContext } from "../../../context"
import { INewInviteLinkProps } from "../interface"
import {
  disInviteLinkContainer,
  inviteButtonStyle,
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  roleSelectorStyle,
} from "./style"

export const InviteLinkMobile: FC<INewInviteLinkProps> = (props) => {
  const { excludeUserRole, onCopyInviteLink, redirectURL } = props

  const {
    defaultAllowInviteLink,
    defaultInviteUserRole,
    currentUserRole,
    teamID,
  } = useContext(InviteMemberContext)

  const { message } = App.useApp()

  const { t } = useTranslation()
  const [inviteUserRole, setInviteUserRole] = useState(defaultInviteUserRole)

  const { data, isLoading } = useGetInviteLinkQuery(
    {
      teamID,
      userRole: inviteUserRole,
      redirectURL,
    },
    {
      skip: !defaultAllowInviteLink,
    },
  )

  const [changeTeamInviteLinkEnable] = useChangeTeamInviteLinkEnabledMutation()

  const enabledInviteLink = useCallback(async () => {
    try {
      await changeTeamInviteLinkEnable({
        teamID,
        inviteLinkEnabled: true,
      })
    } catch {
      message.error({
        content: t("user_management.modal.link.turn_on_fail"),
      })
    }
  }, [changeTeamInviteLinkEnable, teamID, message, t])

  const disableInviteLink = useCallback(async () => {
    try {
      await changeTeamInviteLinkEnable({
        teamID,
        inviteLinkEnabled: false,
      })
    } catch {
      message.error({
        content: t("user_management.modal.link.turn_off_fail"),
      })
    }
  }, [changeTeamInviteLinkEnable, message, t, teamID])

  return (
    <>
      {defaultAllowInviteLink ? (
        <div css={inviteLinkContainer}>
          <div css={inviteLinkHeaderStyle}>
            <InviteIcon />
            <div css={roleSelectorStyle}>
              <RoleSelector
                withoutTips
                excludeUserRole={excludeUserRole}
                currentUserRole={currentUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  setInviteUserRole(role)
                }}
              />
            </div>
          </div>
          <div css={inviteOptionsStyle}>
            <Button
              size="large"
              block
              loading={isLoading}
              onClick={() => {
                const newUrl = new URL(data?.inviteLink ?? "")
                if (redirectURL !== "") {
                  newUrl.searchParams.set("redirectURL", redirectURL)
                }
                onCopyInviteLink?.(newUrl.href)
              }}
            >
              {t("user_management.modal.link.copy")}
            </Button>
            <Button size="large" type="text" block onClick={disableInviteLink}>
              {t("user_management.modal.link.turn_off")}
            </Button>
          </div>
        </div>
      ) : (
        <div css={disInviteLinkContainer}>
          <DisableInviteIcon />
          <Button css={inviteButtonStyle} block onClick={enabledInviteLink}>
            {t("user_management.modal.link.turn_on")}
          </Button>
        </div>
      )}
    </>
  )
}

InviteLinkMobile.displayName = "InviteLinkMobile"
