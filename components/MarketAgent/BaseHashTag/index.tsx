import { getColor } from "@illa-public/color-scheme"
import { Tag } from "antd"
import { FC } from "react"
import { LIMIT_TAG_NUM } from "./constants"
import { cardTagsContainerStyle, tagContentStyle } from "./style"

interface CardHashtagsProps {
  cardHashtags: string[]
}

const CardHashtags: FC<CardHashtagsProps> = (props) => {
  const { cardHashtags } = props
  const tagLength = cardHashtags.length

  const TAG_STYLE = {
    padding: "1px 8px",
    margin: 0,
    borderRadius: "12px",
    backgroundColor: getColor("grayBlue", "09"),
    color: getColor("grayBlue", "02"),
    border: `1px solid ${getColor("grayBlue", "09")}`,
  }

  if (!cardHashtags || tagLength < 1) return null
  return (
    <div css={cardTagsContainerStyle}>
      {cardHashtags.slice(0, LIMIT_TAG_NUM).map((name) => (
        <Tag key={name} style={TAG_STYLE}>
          <span css={tagContentStyle}>
            <span>{name}</span>
          </span>
        </Tag>
      ))}
      {tagLength > LIMIT_TAG_NUM && (
        <Tag style={TAG_STYLE}>
          <span css={tagContentStyle}>
            <span>+{tagLength - LIMIT_TAG_NUM}</span>
          </span>
        </Tag>
      )}
    </div>
  )
}
CardHashtags.displayName = "CardHashtags"

export default CardHashtags
