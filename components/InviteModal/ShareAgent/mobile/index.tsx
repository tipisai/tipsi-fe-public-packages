import Icon from "@ant-design/icons"
import { CloseIcon } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Divider, Drawer } from "antd"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { InviteByEmailMobile } from "../../component/InviteByEmail/mobile"
import { InviteLinkMobile } from "../../component/InviteLink/mobile"
import { ShareAgentProps, ShareAgentTab } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  dividerStyle,
  inviteContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
  spaceLineStyle,
  tabTitleStyle,
  tabsContainerStyle,
} from "./style"

export const ShareAgentMobile: FC<ShareAgentProps> = (props) => {
  const { onClose } = props

  let defTab = ShareAgentTab.TO_MARKETPLACE

  if (props.defaultAgentContributed) {
    defTab = ShareAgentTab.TO_MARKETPLACE
  } else if (props.canInvite && props.canUseBillingFeature) {
    defTab = ShareAgentTab.SHARE_WITH_TEAM
  }

  const [activeTab, setActiveTab] = useState<string>(defTab)

  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleTabChange = (activeKey: string) => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "share_modal_tab",
      parameter2: activeKey,
      parameter5: props.agentID,
    })
    setActiveTab(activeKey)
  }

  return (
    <Drawer
      css={inviteModalStyle}
      width="100%"
      height="70%"
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      onClose={onClose}
      open={true}
    >
      <div css={inviteContainerStyle}>
        <div css={inviteHeaderContainerStyle}>
          <div
            css={closeIconContainerStyle}
            onClick={() => {
              props.onClose?.()
            }}
          >
            <Icon component={CloseIcon} />
          </div>
          <div css={tabsContainerStyle}>
            {props.canInvite && (
              <div
                css={tabTitleStyle(activeTab === ShareAgentTab.SHARE_WITH_TEAM)}
                onClick={() => handleTabChange(ShareAgentTab.SHARE_WITH_TEAM)}
              >
                {t("user_management.modal.tab.with_team")}
              </div>
            )}
            {props.canInvite &&
              props.canUseBillingFeature &&
              props.defaultAgentContributed && <div css={spaceLineStyle} />}
            {props.defaultAgentContributed && (
              <>
                <div
                  css={tabTitleStyle(
                    activeTab === ShareAgentTab.TO_MARKETPLACE,
                  )}
                  onClick={() => handleTabChange(ShareAgentTab.TO_MARKETPLACE)}
                >
                  {t("user_management.modal.title.contribute")}
                </div>
              </>
            )}
          </div>
        </div>
        <div css={contentContainerStyle}>
          {activeTab === ShareAgentTab.TO_MARKETPLACE &&
            props.agentID !== "" &&
            props.agentID !== undefined && (
              <AgentToMarketplaceMobile
                title={props.title}
                agentID={props.agentID}
                onCopyAgentMarketLink={props.onCopyAgentMarketLink}
                onShare={props.onShare}
              />
            )}
          {activeTab === ShareAgentTab.SHARE_WITH_TEAM && (
            <div>
              <InviteLinkMobile
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
              <Divider css={dividerStyle} />
              <InviteByEmailMobile
                onInvitedChange={props.onInvitedChange}
                excludeUserRole={[]}
                onBalanceChange={props.onBalanceChange}
                defaultInviteUserRole={props.defaultInviteUserRole}
                teamID={props.teamID}
                currentUserRole={props.currentUserRole}
                defaultBalance={props.defaultBalance}
                redirectURL={props.redirectURL}
                itemID={props.agentID}
              />
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}
ShareAgentMobile.displayName = "ShareAgentMobile"
