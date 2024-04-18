import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  UNIT_CREDIT_CONVERSION_FUNCTION_NUM,
  UNIT_CREDIT_CONVERSION_TOKEN,
} from "../../service/interface"
import { toThousands } from "../../utils"
import {
  calculatorStyle,
  calculatorTitleStyle,
  goodsStyle,
  orStyle,
  singleGoodStyle,
} from "./style"

interface CalculatorProps {
  changeNum: number
  unitCreditByCycle: number
}

export const Calculator: FC<CalculatorProps> = ({
  changeNum,
  unitCreditByCycle,
}) => {
  const { t } = useTranslation()
  return (
    <div css={calculatorStyle}>
      <span css={calculatorTitleStyle}>
        {t("tipi_billing.credit_calculator_title", {
          purchaseNum: `${toThousands(changeNum * unitCreditByCycle)}`,
        })}
        &nbsp; ≈
      </span>
      <div css={goodsStyle}>
        <span css={singleGoodStyle}>
          {`${t("billing.payment_sidebar.colla.4", {
            tokenNum: `${toThousands(
              changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_TOKEN,
            )}`,
          })}`}
        </span>
        <span css={orStyle}>or</span>
        <span>
          {`${t("billing.payment_sidebar.colla.5", {
            functionNum: `${toThousands(changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_FUNCTION_NUM)}`,
          })}`}
        </span>
      </div>
    </div>
  )
}
