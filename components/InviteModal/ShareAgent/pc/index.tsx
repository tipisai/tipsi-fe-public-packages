import Icon from "@ant-design/icons"
import { CloseIcon } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { USER_ROLE } from "@illa-public/public-types"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  isBiggerThanTargetRole,
} from "@illa-public/user-role-utils"
import { Flex, Modal, Tabs } from "antd"
import { FC, useContext, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AgentToMarketplacePC } from "../../component/AgentToMarketplace/pc"
import { InviteByEmailPC } from "../../component/InviteByEmail/pc"
import { InviteLinkPC } from "../../component/InviteLink/pc"
import { ShareAgentProps, ShareAgentTab } from "../interface"
import { contentContainerStyle } from "./style"

export const ShareAgentPC: FC<ShareAgentProps> = (props) => {
  let defTab = ShareAgentTab.TO_MARKETPLACE

  if (
    props.canInvite &&
    props.canUseBillingFeature &&
    USER_ROLE.VIEWER === props.currentUserRole
  ) {
    defTab = ShareAgentTab.SHARE_WITH_TEAM
  } else if (
    isBiggerThanTargetRole(USER_ROLE.VIEWER, props.currentUserRole) ||
    props.defaultAgentContributed
  ) {
    defTab = ShareAgentTab.TO_MARKETPLACE
  }

  const [activeTab, setActiveTab] = useState<string>(props.defaultTab ?? defTab)

  useEffect(() => {
    if (props.defaultTab === undefined) {
      return
    } else {
      setActiveTab(props.defaultTab)
    }
  }, [props.defaultTab])

  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)
  const tabItems = useMemo(() => {
    const result = []
    if (props.canInvite) {
      result.push({
        label: t("user_management.modal.tab.with_team"),
        key: ShareAgentTab.SHARE_WITH_TEAM,
      })
    }
    if (
      canManage(
        props.userRoleForThisAgent,
        ATTRIBUTE_GROUP.AI_AGENT,
        props.teamPlan,
        ACTION_MANAGE.CREATE_AI_AGENT,
      ) ||
      props.defaultAgentContributed
    ) {
      result.push({
        label: t("user_management.modal.title.contribute"),
        key: ShareAgentTab.TO_MARKETPLACE,
      })
    }
    return result
  }, [])

  return (
    <Modal
      width="520px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      open={true}
      closeIcon={<Icon component={CloseIcon} />}
      centered
      title={
        <Tabs
          size="small"
          items={tabItems}
          activeKey={activeTab}
          onChange={(activeKey) => {
            track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "share_modal_tab",
              parameter2: activeKey,
              parameter5: props.agentID,
            })
            setActiveTab(activeKey)
          }}
        />
      }
    >
      <Flex vertical gap="middle">
        {activeTab === ShareAgentTab.TO_MARKETPLACE &&
          props.agentID !== "" &&
          props.agentID !== undefined && (
            <AgentToMarketplacePC
              title={props.title}
              defaultAgentContributed={props.defaultAgentContributed}
              onAgentContributed={props.onAgentContributed}
              agentID={props.agentID}
              onCopyAgentMarketLink={props.onCopyAgentMarketLink}
              userRoleForThisAgent={props.userRoleForThisAgent}
              ownerTeamID={props.ownerTeamID}
              onShare={props.onShare}
            />
          )}
        {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
          <>
            <InviteLinkPC
              excludeUserRole={[]}
              redirectURL={props.redirectURL}
              defaultBalance={props.defaultBalance}
              defaultInviteUserRole={props.defaultInviteUserRole}
              defaultAllowInviteLink={props.defaultAllowInviteLink}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              onInviteLinkStateChange={props.onInviteLinkStateChange}
              onCopyInviteLink={props.onCopyInviteLink}
            />
            <InviteByEmailPC
              excludeUserRole={[]}
              redirectURL={props.redirectURL}
              onBalanceChange={props.onBalanceChange}
              defaultInviteUserRole={props.defaultInviteUserRole}
              teamID={props.teamID}
              currentUserRole={props.currentUserRole}
              defaultBalance={props.defaultBalance}
              onInvitedChange={props.onInvitedChange}
              itemID={props.agentID}
            />
          </>
        )}
      </Flex>
    </Modal>
  )
}

ShareAgentPC.displayName = "ShareAgentPC"
