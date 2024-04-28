import Icon from "@ant-design/icons"
import { BindIcon } from "@illa-public/icon"
import {
  COPY_STATUS,
  copyToClipboard,
  getAgentPublicLink,
} from "@illa-public/utils"
import { App, Button, Flex } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ShareBlockPC } from "../../components/ShareBlock/pc"
import { IMarketShareProps } from "../../interface"
import { bindIconStyle } from "./style"

export const MarketplaceContentPC: FC<IMarketShareProps> = (props) => {
  const { title, name, ID } = props
  const { t } = useTranslation()

  const { message } = App.useApp()

  const handleCopyMarketplaceLink = (link: string) => {
    const flag = copyToClipboard(
      t("user_management.modal.contribute.default_text.agent", {
        tipisName: name,
        tipisLink: link,
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
    <Flex vertical gap="middle">
      <Button
        block
        icon={<Icon component={BindIcon} css={bindIconStyle} />}
        onClick={() => {
          handleCopyMarketplaceLink?.(getAgentPublicLink(ID))
        }}
      >
        {t("user_management.modal.link.copy")}
      </Button>
      <ShareBlockPC title={title} shareUrl={getAgentPublicLink(ID)} />
    </Flex>
  )
}

MarketplaceContentPC.displayName = "MarketplaceContentPC"
