import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const titleStyle = css`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
  margin-bottom: 8px;

  ${applyMobileStyle(css`
    font-size: 16px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 8px;
  `)}
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin: 8px 24px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
    margin: 8px 24px;
  `)}
`

export const actionAreaStyle = css`
  width: 100%;
  padding: 16px;
  text-align: center;

  ${applyMobileStyle(css`
    padding: 16px;
  `)}
`

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 18px;
  right: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`
