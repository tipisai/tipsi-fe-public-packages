import { Flex } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { PlatformType, ShareBlockProps, SocialMediaList } from "../interface"
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
            <div
              key={platform.platform}
              css={cardContainerStyle}
              onClick={() => {
                // can report platform
              }}
            >
              <div css={cardIconStyle}>{platform.icon}</div>
              <div css={cardNameStyle}>{platform.platformName}</div>
            </div>
          )
          switch (platform.platform) {
            case PlatformType.X:
              return (
                <TwitterShareButton
                  key={platform.platform}
                  url={shareUrl}
                  title={title}
                >
                  {child}
                </TwitterShareButton>
              )
            case PlatformType.REDDIT:
              return (
                <RedditShareButton
                  key={platform.platform}
                  url={shareUrl}
                  title={title}
                >
                  {child}
                </RedditShareButton>
              )
            case PlatformType.LINKEDIN:
              return (
                <LinkedinShareButton
                  key={platform.platform}
                  url={shareUrl}
                  title={title}
                >
                  {child}
                </LinkedinShareButton>
              )
            case PlatformType.HACKER_NEWS:
              return (
                <div
                  key={platform.platform}
                  onClick={() => {
                    window.open(
                      `https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${title}`,
                      "_blank",
                    )
                  }}
                >
                  {child}
                </div>
              )
            case PlatformType.FACEBOOK:
              return (
                <FacebookShareButton
                  key={platform.platform}
                  url={shareUrl}
                  title={title}
                >
                  {child}
                </FacebookShareButton>
              )
            case PlatformType.WHATSAPP:
              return (
                <WhatsappShareButton
                  key={platform.platform}
                  url={shareUrl}
                  title={title}
                >
                  {child}
                </WhatsappShareButton>
              )
            default:
              return null
          }
        })}
      </div>
    </Flex>
  )
}

ShareBlockPC.displayName = "ShareBlockPC"
