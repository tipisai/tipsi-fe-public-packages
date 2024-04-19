import {
  COPY_STATUS,
  copyToClipboard,
  getAgentPublicLink,
} from "@illa-public/utils"
import { App, Button } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import InviteIcon from "../../assets/InviteLink.svg?react"
import { ShareBlockMobile } from "../../components/ShareBlock/mobile"
import { IMarketShareProps } from "../../interface"
import {
  inviteLinkContainer,
  inviteLinkHeaderStyle,
  inviteOptionsStyle,
  shareBlockContainerStyle,
} from "./style"

export const MarketplaceShareContentMobile: FC<IMarketShareProps> = (props) => {
  const { title, ID, name } = props
  const { t } = useTranslation()
  const { message } = App.useApp()

  const handleCopyMarketplaceLink = (link: string) => {
    const flag = copyToClipboard(
      t("user_management.modal.contribute.default_text.agent", {
        agentName: name,
        agentLink: link,
      }),
    )
    if (flag === COPY_STATUS.EMPTY) {
      message.info({
        content: t("empty_copied_tips"),
      })
      message.info(t("empty_copied_tips"))
    } else {
      message.success(t("copied"))
    }
  }

  return (
    <div css={inviteLinkContainer}>
      <div css={inviteLinkHeaderStyle}>
        <InviteIcon />
      </div>
      <div css={inviteOptionsStyle}>
        <Button
          block
          type="primary"
          size="large"
          onClick={() => {
            handleCopyMarketplaceLink?.(getAgentPublicLink(ID))
          }}
        >
          {t("user_management.modal.link.copy")}
        </Button>
      </div>
      <div css={shareBlockContainerStyle}>
        <ShareBlockMobile title={title} shareUrl={getAgentPublicLink(ID)} />
      </div>
    </div>
  )
}

MarketplaceShareContentMobile.displayName = "MarketplaceShareContentMobile"
