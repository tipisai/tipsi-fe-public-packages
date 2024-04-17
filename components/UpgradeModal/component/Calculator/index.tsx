import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  FUNCTION_NUM,
  UNIT_CREDIT_CONVERSION_TOKEN,
} from "../../service/interface"
import {
  calculatorStyle,
  calculatorTitleStyle,
  goodsStyle,
  orStyle,
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
          purchaseNum: `${changeNum * unitCreditByCycle}k`,
        })}
        &nbsp; ≈
      </span>
      <div css={goodsStyle}>
        <span>
          {`${t("billing.payment_sidebar.colla.4", {
            tokenNum: `${
              changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_TOKEN
            }k`,
          })}`}
        </span>
        <span css={orStyle}>or</span>
        <span>
          {`${t("billing.payment_sidebar.colla.5", {
            functionNum: `${changeNum * unitCreditByCycle * FUNCTION_NUM}`,
          })}`}
        </span>
      </div>
    </div>
  )
}
