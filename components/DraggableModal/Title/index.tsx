import { FC } from "react"
import { DragPointIcon } from "@illa-public/icon"
import { ITitleProps } from "./interface"
import { titleContainerStyle } from "./style"

const Title: FC<ITitleProps> = (props) => {
  const { title } = props
  return (
    <div css={titleContainerStyle}>
      <DragPointIcon />
      {title}
    </div>
  )
}

export default Title
