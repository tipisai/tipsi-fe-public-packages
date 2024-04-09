import Icon from "@ant-design/icons"
import { App, Button, Dropdown, Flex, Input, Skeleton } from "antd"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ConfigurationIcon } from "@illa-public/icon"
import { USER_ROLE } from "@illa-public/public-types"
import { RoleSelector } from "@illa-public/role-selector"
import {
  isBiggerThanTargetRole,
  isSmallThanTargetRole,
} from "@illa-public/user-role-utils"
import { isCloudVersion, useMergeValue } from "@illa-public/utils"
import { InviteLinkProps } from "../interface"
import {
  disableInviteLink,
  enableInviteLink,
  getInviteLink,
  renewInviteLink,
} from "../service"
import {
  closeInviteLinkContainerStyle,
  inviteLinkLabelStyle,
  inviteLinkMenuContainer,
  secretLinkStyle,
} from "./style"

export const InviteLinkPC: FC<InviteLinkProps> = (props) => {
  const {
    excludeUserRole,
    defaultAllowInviteLink,
    defaultInviteUserRole,
    onInviteLinkStateChange,
    teamID,
    currentUserRole,
    onCopyInviteLink,
    redirectURL,
    defaultBalance,
  } = props

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [allowInviteLink, setAllowInviteLink] = useMergeValue(
    defaultAllowInviteLink,
    {
      defaultValue: defaultAllowInviteLink,
    },
  )

  const { message } = App.useApp()

  const { t } = useTranslation()
  const [currentInviteLink, setCurrentInviteLink] = useState<string>("")
  const [getLinkLoading, setGetLinkLoading] = useState(false)

  // initial invite link
  useEffect(() => {
    if (!allowInviteLink) {
      return
    }
    let controller = new AbortController()
    const getInviteLinkRequest = async () => {
      setGetLinkLoading(true)
      try {
        const data = await getInviteLink(
          teamID,
          inviteUserRole,
          redirectURL,
          window.customDomain,
          controller.signal,
        )
        const inviteURL = new URL(data.data.inviteLink)
        if (!isCloudVersion) {
          inviteURL.host = window.location.host
        }
        setCurrentInviteLink(inviteURL.toString())
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    }
    getInviteLinkRequest()
    return () => {
      controller.abort()
    }
  }, [
    currentUserRole,
    teamID,
    allowInviteLink,
    inviteUserRole,
    message,
    t,
    redirectURL,
  ])

  const renewInviteLinkRequest = useCallback(
    async (teamID: string, userRole: USER_ROLE) => {
      setGetLinkLoading(true)
      try {
        const data = await renewInviteLink(
          teamID,
          redirectURL,
          userRole,
          window.customDomain,
        )
        setCurrentInviteLink(data.data.inviteLink)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
      setInviteUserRole(userRole)
    },
    [message, redirectURL, setInviteUserRole, t],
  )

  const enableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setGetLinkLoading(true)
      try {
        await enableInviteLink(teamID)
        setAllowInviteLink(true)
        onInviteLinkStateChange?.(true)
      } catch (e) {
        message.error({
          content: t("user_management.modal.link.turn_on_fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  const disableInviteLinkRequest = useCallback(
    async (teamID: string) => {
      setGetLinkLoading(true)
      try {
        await disableInviteLink(teamID)
        setAllowInviteLink(false)
        onInviteLinkStateChange?.(false)
      } catch (error) {
        message.error({
          content: t("user_management.modal.link.turn_off_fail"),
        })
      } finally {
        setGetLinkLoading(false)
      }
    },
    [message, onInviteLinkStateChange, setAllowInviteLink, t],
  )

  return isSmallThanTargetRole(USER_ROLE.ADMIN, currentUserRole, false) &&
    !allowInviteLink ? null : (
    <Flex vertical gap="small">
      {(allowInviteLink ||
        (!allowInviteLink &&
          isBiggerThanTargetRole(USER_ROLE.ADMIN, currentUserRole))) && (
        <div css={inviteLinkMenuContainer}>
          <div css={inviteLinkLabelStyle}>
            {t("user_management.modal.link.invite_title")}
          </div>
          {allowInviteLink &&
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
                      renewInviteLinkRequest(teamID, inviteUserRole)
                    } else if (key === "turn_off") {
                      disableInviteLinkRequest(teamID)
                    }
                  },
                }}
              >
                <Icon component={ConfigurationIcon} />
              </Dropdown>
            )}
        </div>
      )}
      {allowInviteLink ? (
        <Flex gap="small">
          {getLinkLoading ? (
            <Skeleton.Input active block />
          ) : (
            <Input
              size="small"
              readOnly
              value={currentInviteLink}
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
                    await renewInviteLinkRequest(teamID, role)
                  }}
                />
              }
            />
          )}
          <Button
            loading={getLinkLoading}
            onClick={() => {
              if (
                isBiggerThanTargetRole(
                  USER_ROLE.VIEWER,
                  inviteUserRole,
                  false,
                ) &&
                defaultBalance === 0
              ) {
                // TODO: billing
                // upgradeModal({
                //   modalType: "upgrade",
                //   from: "invite_by_link",
                // })
                return
              }
              const newUrl = new URL(currentInviteLink)
              if (redirectURL !== "") {
                newUrl.searchParams.set("redirectURL", redirectURL)
              }
              onCopyInviteLink?.(newUrl.href)
            }}
          >
            {!getLinkLoading ? t("user_management.modal.link.copy") : undefined}
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
              loading={getLinkLoading}
              onClick={async () => {
                await enableInviteLinkRequest(teamID)
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
