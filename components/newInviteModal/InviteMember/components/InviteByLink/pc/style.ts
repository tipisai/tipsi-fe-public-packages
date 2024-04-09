import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const inviteLinkLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  flex-grow: 1;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const inviteLinkMenuContainer = css`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
`

export const closeInviteLinkContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

export const secretLinkStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const inviteLinkStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
