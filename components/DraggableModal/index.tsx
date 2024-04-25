import { Modal } from "antd"
import { FC } from "react"
import { Rnd } from "react-rnd"
import Title from "./Title"
import ResizeBarIcon from "./assets/resize-bar-icon.svg?react"
import { IDraggableModalProps } from "./interface"
import { customModalStyle, resizeIconStyle } from "./style"

export const DraggableModal: FC<IDraggableModalProps> = (props) => {
  const { open, changeOpen, children, title, defaultPosition } = props

  const { width = 520, height = 300 } = defaultPosition ?? {}

  const handleOk = () => {
    changeOpen(false)
  }

  const handleCancel = () => {
    changeOpen(false)
  }

  return (
    <Modal
      title={<Title title={title} />}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose
      modalRender={(modal) => (
        <Rnd
          bounds=".ant-modal-wrap"
          default={{
            width: width,
            height: height,
            x: 0,
            y: 0,
          }}
          minHeight={300}
          minWidth={520}
          resizeHandleWrapperClass="resize-handle-wrapper"
          css={customModalStyle}
        >
          {modal}
        </Rnd>
      )}
    >
      {children}
      <ResizeBarIcon css={resizeIconStyle} />
    </Modal>
  )
}
