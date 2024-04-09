import { App, Input } from "antd"
import { FC, KeyboardEvent, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import {
  useChangeTeamMemberRoleMutation,
  useInviteByEmailMutation,
} from "@illa-public/user-data"
import { EMAIL_FORMAT } from "@illa-public/utils"
import { InviteMemberContext } from "../../../context"
import { InviteByEmailProps, InvitedUser } from "../interface"
import {
  avatarContainerStyle,
  emailInputStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailTitleStyle,
  inviteListContainerStyle,
  nicknameStyle,
} from "./style"

export const InviteByEmailMobile: FC<InviteByEmailProps> = (props) => {
  const { excludeUserRole, redirectURL } = props

  const { defaultInviteUserRole, currentUserRole, teamID } =
    useContext(InviteMemberContext)

  const { message } = App.useApp()
  const { t } = useTranslation()

  const [inviteUserRole, setInviteUserRole] = useState(defaultInviteUserRole)

  const [alreadyInvited, setAlreadyInvited] = useState<InvitedUser[]>([])

  const [currentValue, setCurrentValue] = useState<string>()

  const [inviteByEmail] = useInviteByEmailMutation()
  const [changeUserRoleByTeamMemberID] = useChangeTeamMemberRoleMutation()

  const handleValidateEmail = useCallback((value: string) => {
    if (value.length > 0 && EMAIL_FORMAT.test(value)) {
      return true
    } else {
      return false
    }
  }, [])

  const handleInvite = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (!currentValue) return

      e.currentTarget.blur()

      if (!handleValidateEmail(currentValue)) {
        return message.error({
          content: t("user_management.modal.email.not_mail"),
        })
      } else if (alreadyInvited.find((item) => item.email === currentValue)) {
        return message.error({
          content: t("user_management.modal.email.invited"),
        })
      }
      const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
      try {
        const invitedUserResp = await inviteByEmail({
          teamID: teamID,
          email: currentValue,
          userRole: inviteUserRole,
          redirectURL,
        }).unwrap()
        const currentIndex = finalInviteUserList.findIndex(
          (item) => item.email === currentValue,
        )
        const user = {
          email: currentValue,
          userRole: inviteUserRole,
          teamMemberID: invitedUserResp.teamMemberID,
        }
        if (currentIndex !== -1) {
          finalInviteUserList[currentIndex] = user
        } else {
          finalInviteUserList.push(user)
        }
        setCurrentValue("")
        message.success({ content: t("user_management.mes.invite_suc") })
      } catch (e) {
        if (isILLAAPiError(e)) {
          if (e.data.errorFlag === ERROR_FLAG.ERROR_FLAG_EMAIL_ALREADY_USED) {
            message.error({
              content: t("user_management.modal.email.invited"),
            })
          }
        } else {
          message.error({
            content: t("user_management.mes.invite_fail"),
          })
        }
      }

      setAlreadyInvited(finalInviteUserList)
    },
    [
      alreadyInvited,
      currentValue,
      handleValidateEmail,
      inviteByEmail,
      inviteUserRole,
      message,
      redirectURL,
      t,
      teamID,
    ],
  )

  const handleUserRoleChange = useCallback(
    async (user: InvitedUser, item: USER_ROLE) => {
      try {
        await changeUserRoleByTeamMemberID({
          teamID,
          teamMemberID: user.teamMemberID,
          userRole: item,
        })
        const index = alreadyInvited.findIndex((u) => u.email === user.email)
        if (index != -1) {
          const newAlreadyInvited = [...alreadyInvited]
          newAlreadyInvited[index].userRole = item
          setAlreadyInvited(newAlreadyInvited)
        }
        message.success({
          content: t("user_management.mes.invite_suc"),
        })
      } catch (e) {
        message.error({
          content: t("user_management.mes.change_role_fail"),
        })
      }
    },
    [alreadyInvited, changeUserRoleByTeamMemberID, message, t, teamID],
  )

  return (
    <div css={inviteByEmailContainerStyle(false)}>
      <span css={inviteByEmailTitleStyle}>
        {t("user_management.modal.email.invite_title")}
      </span>
      <div css={inviteByEmailInputContainerStyle}>
        <Input
          css={emailInputStyle}
          size="large"
          variant="filled"
          value={currentValue}
          onChange={(e) => {
            const value = e.target.value
            setCurrentValue(value)
          }}
          onPressEnter={handleInvite}
          placeholder={t("user_management.modal.email.placeholder")}
          suffix={
            <RoleSelector
              withoutTips
              excludeUserRole={excludeUserRole}
              currentUserRole={currentUserRole}
              value={inviteUserRole}
              onClickItem={async (role) => {
                setInviteUserRole(role)
              }}
            />
          }
        />
      </div>

      <div css={inviteListContainerStyle}>
        {alreadyInvited.map((user) => {
          return (
            <div key={user.email} css={avatarContainerStyle}>
              <Avatar name={user.email} />
              <div css={nicknameStyle}>{user.email}</div>
              <RoleSelector
                withoutTips
                currentUserRole={currentUserRole}
                value={user.userRole}
                onClickItem={(item) => handleUserRoleChange(user, item)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

InviteByEmailMobile.displayName = "InviteByEmailMobile"
