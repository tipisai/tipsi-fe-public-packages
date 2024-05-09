import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getComponentByPlatform } from "../config"
import { ShareBlockProps, SocialMediaList } from "../interface"
import {
  cardContainerStyle,
  cardIconStyle,
  shareContainerStyle,
  shareIconContainerStyle,
  shareLabelStyle,
} from "./style"

export const ShareBlockMobile: FC<ShareBlockProps> = (props) => {
  const { title, shareUrl } = props
  const { t } = useTranslation()
  return (
    <div css={shareContainerStyle}>
      <div css={shareLabelStyle}>
        {t("user_management.modal.social_media.label")}
      </div>
      <div css={shareIconContainerStyle}>
        {SocialMediaList.map((platform) => {
          const child = (
            <div css={cardContainerStyle}>
              <div css={cardIconStyle}>{platform.icon}</div>
            </div>
          )
          return getComponentByPlatform(platform.platform, child, {
            shareUrl,
            title,
          })
        })}
      </div>
    </div>
  )
}

ShareBlockMobile.displayName = "ShareBlockMobile"
