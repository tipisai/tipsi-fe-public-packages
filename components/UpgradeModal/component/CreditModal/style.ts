import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 16px;
  right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${getColor("grayBlue", "02")};
`

export const decorateStyle = css`
  width: 100%;

  ${applyMobileStyle(css`
    height: 100%;
  `)};
`

export const headerStyle = css`
  padding: 16px;
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 8px;

  ${applyMobileStyle(css`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 8px;
  `)};
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 17px;
  `)};
`

export const footerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`

export const priceContentStyle = css`
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 12px;
    line-height: 20px;
  `)};
`

export const priceStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

const hiddenListContent = css`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    padding: 4px 24px;
  }
`

export const blockListContent = css`
  padding: 4px 24px;
`
