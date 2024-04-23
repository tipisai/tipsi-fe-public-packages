import { FC, SVGProps } from "react"
import LarkIcon from "./lark.svg?react"
import TencentCloud from "./tencentCloud.svg?react"

// integration
export const INTEGRATION_TYPE_MAP_ICON: Record<
  string,
  FC<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
> = {
  larkBot: LarkIcon,
  tencentCos: TencentCloud,
}
