import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const inviteByEmailContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const inviteByEmailLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const inviteListContainerStyle = css`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

export const avatarContainerStyle = css`
  margin-top: 16px;
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
