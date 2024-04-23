import { IMarketShareProps } from ".."

export interface IMarketShareModalProps extends IMarketShareProps {
  onClose: () => void
  visible: boolean
}
