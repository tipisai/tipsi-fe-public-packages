import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  UNIT_CREDIT_CONVERSION_STORAGE,
  UNIT_CREDIT_CONVERSION_TOKEN,
  UNIT_CREDIT_CONVERSION_TRAFFIC,
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
        {t("billing.payment_sidebar.colla.1", {
          purchaseNum: `${changeNum * unitCreditByCycle}k`,
        })}
        &nbsp; ≈
      </span>
      <div css={goodsStyle}>
        <span>{`${t("billing.payment_sidebar.colla.2", {
          storageNum: `${
            changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_STORAGE
          }GB`,
        })}`}</span>
        <span css={orStyle}>or</span>
        <span>
          {`${t("billing.payment_sidebar.colla.3", {
            trafficNum: `${
              changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_TRAFFIC
            }GB`,
          })}`}
        </span>
        <span css={orStyle}>or</span>
        <span>
          {`${t("billing.payment_sidebar.colla.4", {
            tokenNum: `${
              changeNum * unitCreditByCycle * UNIT_CREDIT_CONVERSION_TOKEN
            }k`,
          })}`}
        </span>
      </div>
    </div>
  )
}
