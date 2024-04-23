import { FC, SVGProps } from "react"
import { TIntegrationType } from "@illa-public/public-types"
import LarkIcon from "./lark.svg?react"
import TencentCloud from "./tencentCloud.svg?react"

// integration
export const INTEGRATION_TYPE_MAP_ICON: Record<
  TIntegrationType,
  FC<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
> = {
  larkBot: LarkIcon,
  tencentcos: TencentCloud,
}
