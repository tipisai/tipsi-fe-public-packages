import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const inviteByEmailContainerStyle = (loading: boolean) => css`
  display: flex;
  position: relative;
  flex-direction: column;
  opacity: ${loading ? 0.5 : 1};
`

export const inviteByEmailTitleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 16px;
`
export const inviteByEmailInputContainerStyle = css`
  display: flex;
  flex-direction: row;
`

export const inviteListContainerStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

export const avatarContainerStyle = css`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const nicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  white-space: nowrap;
  flex: 1;
  text-overflow: ellipsis;
  margin-left: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const emailInputStyle = css`
  height: 44px;
  font-size: 14px;
  line-height: 17px;
`
