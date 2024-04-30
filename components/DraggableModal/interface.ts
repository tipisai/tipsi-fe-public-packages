import { ReactNode } from "react"

export interface IDraggableModalProps {
  open: boolean
  changeOpen: (open: boolean) => void
  title: string
  children?: ReactNode
  defaultPosition?: {
    width: number
    height: number
  }
}
