import Icon from "@ant-design/icons"
import { CloseIcon } from "@illa-public/icon"
import { Modal, Tabs } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ShareAgentTab } from "../../ShareAgent/interface"
import { AgentToMarketplacePC } from "../../component/AgentToMarketplace/pc"
import { MarketShareAgentProps } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"

export const MarketShareAgentPC: FC<MarketShareAgentProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Modal
      width="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      open={true}
      centered
    >
      <div css={headerContainerStyle}>
        <Tabs
          items={[
            {
              label: t("user_management.modal.title.share_agent"),
              key: t("user_management.modal.title.share_agent"),
            },
          ]}
        />
        <div
          css={closeIconStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <Icon component={CloseIcon} />
        </div>
      </div>
      <div css={contentContainerStyle}>
        <AgentToMarketplacePC
          title={props.title}
          onShare={props.onShare}
          defaultAgentContributed={props.defaultAgentContributed}
          onAgentContributed={props.onAgentContributed}
          agentID={props.agentID}
          onCopyAgentMarketLink={props.onCopyAgentMarketLink}
          userRoleForThisAgent={props.userRoleForThisAgent}
          ownerTeamID={props.ownerTeamID}
        />
      </div>
    </Modal>
  )
}

MarketShareAgentPC.displayName = "MarketShareAgentPC"
