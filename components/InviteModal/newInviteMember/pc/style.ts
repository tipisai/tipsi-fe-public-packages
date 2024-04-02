import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const headerContainerStyle = css`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

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
