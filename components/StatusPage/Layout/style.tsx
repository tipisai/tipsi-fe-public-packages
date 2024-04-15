import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-public/color-scheme"

export const errorPageStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 30vh 20px 0 20px;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: bold;
  line-height: 22px;
  span + span {
    font-weight: normal;
    color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
    text-align: center;
  }
`

export const iconStyle = css`
  height: 96px;
  width: 96px;
  border-radius: 50px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  margin-bottom: 24px;
`

export const buttonStyle = css`
  margin-top: 24px;
  display: flex;
  gap: 8px;
  justify-content: center;
`
