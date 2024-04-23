import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const headerContainerStyle = css`
  padding: 0 16px 16px 0;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${getColor("grayBlue", "09")};
`

export const contentContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`
