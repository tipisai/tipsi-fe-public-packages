import Icon from "@ant-design/icons"
import { CloseIcon } from "@illa-public/icon"
import { Drawer } from "antd"
import { FC } from "react"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { MarketShareAgentProps } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const MarketShareAgentMobile: FC<MarketShareAgentProps> = (props) => {
  return (
    <Drawer
      css={inviteModalStyle}
      placement="bottom"
      maskClosable={false}
      closable={false}
      footer={false}
      open={true}
    >
      <div css={inviteHeaderContainerStyle}>
        <div
          css={closeIconContainerStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <Icon component={CloseIcon} />
        </div>
      </div>
      <div css={contentContainerStyle}>
        <AgentToMarketplaceMobile
          title={props.title}
          onShare={props.onShare}
          agentID={props.agentID}
          onCopyAgentMarketLink={props.onCopyAgentMarketLink}
        />
      </div>
    </Drawer>
  )
}

MarketShareAgentMobile.displayName = "MarketShareAgentMobile"
