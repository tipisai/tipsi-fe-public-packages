import { IBaseIntegration, TIntegrationType } from "@illa-public/public-types"
import { INIT_LARK_BOT_INTEGRATION } from "./initConfig/larkBot"
import { INIT_TENCENT_COS_INTEGRATION } from "./initConfig/tencentCos"

export const INTEGRATION_TYPE_MAP_CONFIG: Record<
  TIntegrationType,
  IBaseIntegration
> = {
  larkbot: INIT_LARK_BOT_INTEGRATION,
  tencentcos: INIT_TENCENT_COS_INTEGRATION,
}
