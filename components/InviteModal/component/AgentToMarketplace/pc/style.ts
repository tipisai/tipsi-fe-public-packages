import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const blockContainerStyle = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const blockLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const contributingDocStyle = css`
  color: ${getColor("grayBlue", "04")};
  margin-right: 54px;
  white-space: break-spaces;
  word-break: break-all;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
