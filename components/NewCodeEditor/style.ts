import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const ILLACodeMirrorWrapperStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  :hover {
    .open-window-icon-hotspot {
      visibility: visible;
    }
  }
`

export const openWindowIconHotspotStyle = css`
  position: absolute;
  z-index: 10;
  right: 2px;
  bottom: 2px;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  color: ${getColor("grayBlue", "03")};
  transition: color 0.3s;
  :hover {
    color: ${getColor("grayBlue", "02")};
  }
`
