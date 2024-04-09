import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const contentContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
`

export const closeIconStyle = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  justify-content: center;
  width: 24px;
  height: 24px;
`
