import { Modal } from "antd"
import { FC } from "react"
import { Rnd } from "react-rnd"
import { useWindowSize } from "react-use"
import Title from "./Title"
import ResizeBarIcon from "./assets/resize-bar-icon.svg?react"
import { IDraggableModalProps } from "./interface"
import { customModalStyle, resizeIconStyle } from "./style"

export const DraggableModal: FC<IDraggableModalProps> = (props) => {
  const { open, changeOpen, children, title, defaultPosition } = props

  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { width = windowWidth * 0.8, height = windowHeight * 0.8 } =
    defaultPosition ?? {}

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
      width={width}
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
