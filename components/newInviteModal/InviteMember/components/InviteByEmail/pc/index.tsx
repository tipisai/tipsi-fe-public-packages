import { App, Button, Flex, Select } from "antd"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
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
  inviteByEmailContainerStyle,
  inviteByEmailLabelStyle,
  inviteListContainerStyle,
  nicknameStyle,
} from "./style"

export const InviteByEmailPC: FC<InviteByEmailProps> = (props) => {
  const { excludeUserRole = [], redirectURL } = props

  const { message } = App.useApp()

  const { t } = useTranslation()

  const { defaultInviteUserRole, currentUserRole, teamID } =
    useContext(InviteMemberContext)

  const [inviteUserRole, setInviteUserRole] = useState(defaultInviteUserRole)

  const [alreadyInvited, setAlreadyInvited] = useState<InvitedUser[]>([])

  const [inviting, setInviting] = useState(false)

  const [currentValue, setCurrentValue] = useState<string[]>([])

  const [inviteByEmail] = useInviteByEmailMutation()
  const [changeUserRoleByTeamMemberID] = useChangeTeamMemberRoleMutation()

  const handleOnInviteButton = async () => {
    setInviting(true)
    const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
    for (let i = 0; i < currentValue.length; i++) {
      try {
        const invitedUserResp = await inviteByEmail({
          teamID: teamID,
          email: currentValue[i],
          userRole: inviteUserRole,
          redirectURL,
        }).unwrap()
        const currentIndex = finalInviteUserList.findIndex(
          (item) => item.email === currentValue[i],
        )
        const user = {
          email: currentValue[i],
          userRole: inviteUserRole,
          teamMemberID: invitedUserResp.teamMemberID,
        }
        if (currentIndex !== -1) {
          finalInviteUserList[currentIndex] = user
        } else {
          finalInviteUserList.push(user)
        }
        setCurrentValue([])
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
    }
    setAlreadyInvited(finalInviteUserList)
    setInviting(false)
  }

  const handleOnChangeInviteEmail = (v: string[]) => {
    let action = "add"
    if (v.length < currentValue.length) {
      action = "remove"
    }
    if (action === "remove") {
      setCurrentValue(v as string[])
    }
    if (action === "add") {
      const lastValue = v[v.length - 1]
      const suc = lastValue.length > 0 && EMAIL_FORMAT.test(lastValue)
      if (!suc) {
        message.error({
          content: t("user_management.modal.email.not_mail", {
            email: lastValue,
          }),
        })
        return
      }
      if (lastValue && lastValue.trim() !== "") {
        setCurrentValue(v as string[])
      }
    }
  }

  return (
    <div css={inviteByEmailContainerStyle}>
      <Flex vertical gap="small">
        <div css={inviteByEmailLabelStyle}>
          {t("user_management.modal.email.invite_title")}
        </div>
        <Flex gap="small">
          <Select
            size="middle"
            mode="tags"
            open={false}
            value={currentValue}
            onChange={handleOnChangeInviteEmail}
            style={{
              width: "100%",
            }}
            suffixIcon={
              <RoleSelector
                currentUserRole={currentUserRole}
                excludeUserRole={excludeUserRole}
                value={inviteUserRole}
                onClickItem={async (role) => {
                  setInviteUserRole(role)
                }}
              />
            }
          />
          <Button
            disabled={currentValue.length === 0}
            size="large"
            loading={inviting}
            onClick={handleOnInviteButton}
            style={{
              width: "80px",
              flex: "none",
            }}
          >
            {!inviting ? t("user_management.modal.email.invite") : undefined}
          </Button>
        </Flex>
      </Flex>
      {alreadyInvited.length > 0 && (
        <div css={inviteListContainerStyle}>
          {alreadyInvited.map((user) => {
            return (
              <div key={user.email} css={avatarContainerStyle}>
                <Avatar name={user.email} />
                <div css={nicknameStyle}>{user.email}</div>
                <RoleSelector
                  currentUserRole={currentUserRole}
                  value={user.userRole}
                  onClickItem={async (item) => {
                    setInviting(true)
                    try {
                      await changeUserRoleByTeamMemberID({
                        teamID,
                        teamMemberID: user.teamMemberID,
                        userRole: item,
                      })
                      const index = alreadyInvited.findIndex(
                        (u) => u.email === user.email,
                      )
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
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

InviteByEmailPC.displayName = "InviteByEmailPC"
