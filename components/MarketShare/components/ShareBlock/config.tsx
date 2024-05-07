import { ReactNode } from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { PlatformType } from "./interface"

export const getComponentByPlatform = (
  platform: PlatformType,
  child: ReactNode,
  options: {
    shareUrl: string
    title: string
  },
) => {
  const { shareUrl, title } = options
  switch (platform) {
    case PlatformType.X:
      return (
        <TwitterShareButton key={platform} url={shareUrl} title={title}>
          {child}
        </TwitterShareButton>
      )
    case PlatformType.REDDIT:
      return (
        <RedditShareButton key={platform} url={shareUrl} title={title}>
          {child}
        </RedditShareButton>
      )
    case PlatformType.LINKEDIN:
      return (
        <LinkedinShareButton key={platform} url={shareUrl} title={title}>
          {child}
        </LinkedinShareButton>
      )
    case PlatformType.HACKER_NEWS:
      return (
        <div
          key={platform}
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
        <FacebookShareButton key={platform} url={shareUrl} title={title}>
          {child}
        </FacebookShareButton>
      )
    case PlatformType.WHATSAPP:
      return (
        <WhatsappShareButton key={platform} url={shareUrl} title={title}>
          {child}
        </WhatsappShareButton>
      )
    default:
      return null
  }
}
