import Icon from "@ant-design/icons"
import { App, Button, Dropdown, Flex, Input, Skeleton } from "antd"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { ConfigurationIcon } from "@illa-public/icon"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import {
  useChangeTeamInviteLinkEnabledMutation,
  useGetInviteLinkQuery,
} from "@illa-public/user-data"
import {
  isBiggerThanTargetRole,
  isSmallThanTargetRole,
} from "@illa-public/user-role-utils"
import { InviteMemberContext } from "../../../context"
import { INewInviteLinkProps } from "../interface"
import {
  closeInviteLinkContainerStyle,
  inviteLinkLabelStyle,
  inviteLinkMenuContainer,
  secretLinkStyle,
} from "./style"

export const InviteLinkPC: FC<INewInviteLinkProps> = (props) => {
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

  const { data, refetch, isLoading } = useGetInviteLinkQuery(
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

  const renewInviteLinkRequest = useCallback(async () => {
    try {
      await refetch()
    } catch (e) {
      message.error({
        content: t("user_management.modal.link.fail"),
      })
    }
  }, [message, refetch, t])

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

  return isSmallThanTargetRole(USER_ROLE.ADMIN, currentUserRole, false) &&
    !defaultAllowInviteLink ? null : (
    <Flex vertical gap="small">
      {(defaultAllowInviteLink ||
        (!defaultAllowInviteLink &&
          isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole))) && (
        <div css={inviteLinkMenuContainer}>
          <div css={inviteLinkLabelStyle}>
            {t("user_management.modal.link.invite_title")}
          </div>
          {defaultAllowInviteLink &&
            isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole) && (
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      label: t("user_management.modal.link.update"),
                      key: "update",
                    },
                    {
                      label: t("user_management.modal.link.turn_off"),
                      key: "turn_off",
                    },
                  ],
                  onClick: ({ key }) => {
                    if (key === "update") {
                      renewInviteLinkRequest()
                    } else if (key === "turn_off") {
                      disableInviteLink()
                    }
                  },
                }}
              >
                <Icon component={ConfigurationIcon} />
              </Dropdown>
            )}
        </div>
      )}
      {defaultAllowInviteLink ? (
        <Flex gap="small">
          {isLoading ? (
            <Skeleton.Input active block />
          ) : (
            <Input
              size="small"
              readOnly
              value={data?.inviteLink}
              suffix={
                <RoleSelector
                  currentUserRole={currentUserRole}
                  excludeUserRole={excludeUserRole}
                  value={inviteUserRole}
                  onClickItem={async (role) => {
                    // if (
                    //   isBiggerThanTargetRole(USER_ROLE.VIEWER, role, false) &&
                    //   defaultBalance === 0
                    // ) {
                    //   // TODO: billing
                    //   // upgradeModal({
                    //   //   modalType: "upgrade",
                    //   //   from: "invite_by_link",
                    //   // })
                    // } else {
                    //   await renewInviteLinkRequest(teamID, role)
                    // }
                    setInviteUserRole(role)
                  }}
                />
              }
            />
          )}
          <Button
            loading={isLoading}
            onClick={() => {
              const newUrl = new URL(data?.inviteLink ?? "")
              if (redirectURL !== "") {
                newUrl.searchParams.set("redirectURL", redirectURL)
              }
              onCopyInviteLink?.(newUrl.href)
            }}
          >
            {!isLoading ? t("user_management.modal.link.copy") : undefined}
          </Button>
        </Flex>
      ) : (
        isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole) && (
          <div css={closeInviteLinkContainerStyle}>
            <div css={secretLinkStyle}>
              {t("user_management.modal.link.description")}
            </div>
            <Button
              type="link"
              size="small"
              loading={isLoading}
              onClick={async () => {
                await enabledInviteLink()
              }}
            >
              {t("user_management.modal.link.turn_on")}
            </Button>
          </div>
        )
      )}
    </Flex>
  )
}

InviteLinkPC.displayName = "InviteLinkPC"
