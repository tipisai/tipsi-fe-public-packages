import { Flex } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getComponentByPlatform } from "../config"
import { ShareBlockProps, SocialMediaList } from "../interface"
import {
  cardContainerStyle,
  cardIconStyle,
  cardNameStyle,
  shareGridLayoutStyle,
  shareLabelStyle,
} from "./style"

export const ShareBlockPC: FC<ShareBlockProps> = (props) => {
  const { title, shareUrl } = props

  const { t } = useTranslation()

  return (
    <Flex vertical gap="small">
      <div css={shareLabelStyle}>
        {t("user_management.modal.social_media.label")}
      </div>
      <div css={shareGridLayoutStyle}>
        {SocialMediaList.map((platform) => {
          const child = (
            <div key={platform.platform} css={cardContainerStyle}>
              <div css={cardIconStyle}>{platform.icon}</div>
              <div css={cardNameStyle}>{platform.platformName}</div>
            </div>
          )
          return getComponentByPlatform(platform.platform, child, {
            shareUrl,
            title,
          })
        })}
      </div>
    </Flex>
  )
}

ShareBlockPC.displayName = "ShareBlockPC"
