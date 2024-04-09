import Icon from "@ant-design/icons"
import { App, Input } from "antd"
import { FC, KeyboardEvent, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Avatar } from "@illa-public/avatar"
import { LoadingIcon } from "@illa-public/icon"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { EMAIL_FORMAT } from "@illa-public/utils"
import { useMergeValue } from "@illa-public/utils"
import { InviteByEmailProps, InvitedUser } from "../interface"
import { changeUserRoleByTeamMemberID, inviteByEmail } from "../service"
import {
  applyLicenseNumberStyle,
  avatarContainerStyle,
  emailInputStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailTitleStyle,
  inviteListContainerStyle,
  licenseContainerStyle,
  licenseLabelStyle,
  loadingStyle,
  nicknameStyle,
} from "./style"

export const InviteByEmailMobile: FC<InviteByEmailProps> = (props) => {
  const {
    excludeUserRole,
    defaultInviteUserRole,
    defaultBalance,
    teamID,
    currentUserRole,
    redirectURL,
    onBalanceChange,
    itemID,
  } = props

  const { message } = App.useApp()
  const { t } = useTranslation()

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [currentBalance, setCurrentBalance] = useMergeValue(defaultBalance, {
    defaultValue: defaultBalance,
  })

  const [alreadyInvited, setAlreadyInvited] = useState<InvitedUser[]>([])

  const [inviting, setInviting] = useState(false)

  const [currentValue, setCurrentValue] = useState<string>()

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
      if (
        (isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole) &&
          currentBalance === 0) ||
        currentBalance < 0
      ) {
        // TODO: billing
        // upgradeModal({
        //   modalType: "upgrade",
        //   from: "invite_by_email",
        // })
        return
      }
      if (!handleValidateEmail(currentValue)) {
        return message.error({
          content: t("user_management.modal.email.not_mail"),
        })
      } else if (alreadyInvited.find((item) => item.email === currentValue)) {
        return message.error({
          content: t("user_management.modal.email.invited"),
        })
      }
      setInviting(true)
      const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
      try {
        const invitedUserResp = await inviteByEmail(
          teamID,
          currentValue,
          inviteUserRole,
          redirectURL,
          window.customDomain,
        )
        const currentIndex = finalInviteUserList.findIndex(
          (item) => item.email === currentValue,
        )
        const user = {
          email: currentValue,
          userRole: inviteUserRole,
          teamMemberID: invitedUserResp.data.teamMemberID,
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
      if (isBiggerThanTargetRole(USER_ROLE.EDITOR, inviteUserRole)) {
        setCurrentBalance(currentBalance - 1)
        onBalanceChange(currentBalance - 1)
      }
      setAlreadyInvited(finalInviteUserList)
      setInviting(false)
    },
    [
      alreadyInvited,
      currentBalance,
      currentValue,
      handleValidateEmail,
      inviteUserRole,
      itemID,
      message,
      onBalanceChange,
      redirectURL,
      setCurrentBalance,
      t,
      teamID,
    ],
  )

  const handleUserRoleChange = useCallback(
    async (user: InvitedUser, item: USER_ROLE) => {
      setInviting(true)
      try {
        await changeUserRoleByTeamMemberID(teamID, user.teamMemberID, item)
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
      } finally {
        setInviting(false)
      }
    },
    [alreadyInvited, message, t, teamID],
  )

  return (
    <div css={inviteByEmailContainerStyle(inviting)}>
      <span css={inviteByEmailTitleStyle}>
        {t("user_management.modal.email.invite_title")}
      </span>
      <div css={inviteByEmailInputContainerStyle}>
        <Input
          css={emailInputStyle}
          readOnly={inviting}
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
      <div css={licenseContainerStyle}>
        <div css={licenseLabelStyle}>
          {t("user_management.modal.tips.license_insufficient")}
        </div>
        <div
          css={applyLicenseNumberStyle(!!currentBalance && currentBalance > 0)}
        >
          {currentBalance ?? 0}
        </div>
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
      {inviting && (
        <div css={loadingStyle}>
          <Icon component={LoadingIcon} spin />
        </div>
      )}
    </div>
  )
}

InviteByEmailMobile.displayName = "InviteByEmailMobile"
