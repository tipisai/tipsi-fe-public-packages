import Icon from "@ant-design/icons"
import { App, Button, Flex, Switch } from "antd"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { BindIcon, PenIcon } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE } from "@illa-public/public-types"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { getAgentPublicLink, useMergeValue } from "@illa-public/utils"
import { ContributeAgentPC } from "../../../ContributeAgent/pc"
import { HASHTAG_REQUEST_TYPE } from "../../../constants"
import { ShareBlockPC } from "../../ShareBlock/pc"
import { AgentToMarketplaceProps } from "../interface"
import { fetchRemoveToMarketplace, makeAgentContribute } from "../service"
import {
  blockContainerStyle,
  blockLabelStyle,
  contributingDocStyle,
} from "./style"

export const AgentToMarketplacePC: FC<AgentToMarketplaceProps> = (props) => {
  const {
    title,
    defaultAgentContributed,
    onAgentContributed,
    userRoleForThisAgent,
    agentID,
    onShare,
    onCopyAgentMarketLink,
    ownerTeamID,
  } = props

  const [agentContributed, setAgentContributed] = useMergeValue(
    defaultAgentContributed,
    {
      defaultValue: defaultAgentContributed,
    },
  )

  const [isOpenContributeModal, setIsOpenContributeModal] = useState(false)

  const [agentContributedLoading, setAgentContributedLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const { t } = useTranslation()

  const { message } = App.useApp()

  return (
    <>
      <Flex vertical gap="middle">
        <Flex vertical gap="small">
          {(isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            userRoleForThisAgent,
            false,
          ) ||
            agentContributed) && (
            <div css={blockContainerStyle}>
              <div css={blockLabelStyle}>
                {t("user_management.modal.contribute.label")}
              </div>

              {isBiggerThanTargetRole(
                USER_ROLE.VIEWER,
                userRoleForThisAgent,
                false,
              ) && (
                <Switch
                  size="small"
                  checked={agentContributed}
                  loading={agentContributedLoading}
                  onChange={async (value) => {
                    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                      element: "share_modal_contribute_switch",
                      parameter2: !value,
                      parameter5: agentID,
                    })
                    setAgentContributed(value)
                    try {
                      setAgentContributedLoading(true)
                      if (value) {
                        await makeAgentContribute(ownerTeamID, agentID)
                      } else {
                        await fetchRemoveToMarketplace(ownerTeamID, agentID)
                      }
                      onAgentContributed?.(value)
                    } catch (e) {
                      message.error({
                        content: t(
                          "user_management.modal.message.make_public_failed",
                        ),
                      })
                      setAgentContributed(!value)
                    } finally {
                      setAgentContributedLoading(false)
                    }
                  }}
                />
              )}
            </div>
          )}
          {agentContributed ? (
            <Flex gap="small">
              {isBiggerThanTargetRole(
                USER_ROLE.VIEWER,
                userRoleForThisAgent,
                false,
              ) && (
                <Button
                  block
                  icon={<Icon component={PenIcon} />}
                  onClick={() => {
                    setIsOpenContributeModal(true)
                  }}
                >
                  {t("contribute.update")}
                </Button>
              )}
              <Button
                block
                icon={<Icon component={BindIcon} />}
                onClick={() => {
                  onCopyAgentMarketLink?.(getAgentPublicLink(agentID))
                }}
              >
                {t("user_management.modal.link.copy")}
              </Button>
            </Flex>
          ) : (
            <div css={contributingDocStyle}>
              {t("user_management.modal.contribute.desc")}
            </div>
          )}
        </Flex>
        {agentContributed && (
          <ShareBlockPC
            onShare={onShare}
            title={title}
            shareUrl={getAgentPublicLink(agentID)}
          />
        )}
      </Flex>
      {isOpenContributeModal && (
        <ContributeAgentPC
          onContributed={props.onAgentContributed}
          teamID={ownerTeamID}
          onClose={() => {
            setIsOpenContributeModal(false)
          }}
          productID={agentID}
          productType={HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT}
          productContributed={agentContributed}
        />
      )}
    </>
  )
}

AgentToMarketplacePC.displayName = "AgentToMarketplacePC"
