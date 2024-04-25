import { css } from "@emotion/react"

export const resizeIconStyle = css`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  cursor: pointer;
`

export const customModalStyle = css`
  pointer-events: none;
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .resize-handle-wrapper {
    pointer-events: auto;
  }
`
