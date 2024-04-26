import Icon from "@ant-design/icons"
import { App, ConfigProvider, Divider, Drawer, InputNumber, Select } from "antd"
import { Button } from "antd"
import { FC, useEffect, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { TipisTrack } from "@illa-public/track-utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isMobileByWindowSize } from "@illa-public/utils"
import { BILLING_REPORT_TYPE } from "../../constants"
import { CREDIT_TYPE } from "../../interface"
import { cancelSubscribe, modifySubscribe, subscribe } from "../../service"
import {
  CREDIT_UNIT_BY_CYCLE,
  CREDIT_UNIT_PRICE,
} from "../../service/interface"
import {
  getSuccessRedirectWithParams,
  isSubscribeForDrawer,
  toThousands,
} from "../../utils"
import { Calculator } from "../Calculator"
import { LEARN_MORE_LINK, SUBSCRIBE_CLASS_NAME } from "./constants"
import { useGetDataState, useGetUIState } from "./hooks"
import { CreditDrawerProps } from "./interface"
import {
  accountsStyle,
  closeIconContainerStyle,
  closeIconStyle,
  descriptionStyle,
  drawerContentStyle,
  manageContentStyle,
  manageHeaderStyle,
  manageItemStyle,
  managePriceStyle,
  priceStyle,
  priceTotalLabelStyle,
  priceTotalStyle,
  subTotalStyle,
  titleContainerStyle,
  titleStyle,
} from "./style"
import { getCurrentCreditType } from "./utils"

export const CreditDrawer: FC<CreditDrawerProps> = (props) => {
  const { onCancel, visible, afterClose, onSuccessCallback, from, subCycle } =
    props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [loading, setLoading] = useState<boolean>(false)
  const { message } = App.useApp()

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const isSubScribe = isSubscribeForDrawer(currentTeamInfo?.credit?.plan)
  const teamQuantity =
    currentTeamInfo?.credit?.quantity === 0
      ? 1
      : currentTeamInfo?.credit?.quantity

  const [currentQuantity, setCurrentQuantity] = useState<number>(
    teamQuantity ?? 1,
  )
  const [cycle, setCycle] = useState<SUBSCRIPTION_CYCLE>(
    isSubScribe
      ? currentTeamInfo?.credit?.cycle ?? SUBSCRIPTION_CYCLE.MONTHLY
      : subCycle ?? SUBSCRIPTION_CYCLE.MONTHLY,
  )

  const { btnText, description, paymentOptions } = useGetUIState(
    currentQuantity,
    cycle,
  )

  const {
    disabledSubscribe,
    isCancelSubscribe,
    unitPrice,
    unitCreditByCycle,
    calculatorNum,
    hiddenCalculator,
  } = useGetDataState(currentQuantity, cycle)

  const handleCancel = () => {
    setCurrentQuantity(teamQuantity)
    onCancel?.()
  }

  const getBlockSubscribeQuantity = (
    type: CREDIT_TYPE,
  ): boolean | undefined => {
    switch (type) {
      case CREDIT_TYPE.CANCEL_SUBSCRIPTION: {
        return false
      }
      case CREDIT_TYPE.MODIFY_SUBSCRIPTION: {
        if (currentQuantity < teamQuantity) {
          message.info(t("tipi_billing.restore_subscribe_first"))
          return true
        }
        break
      }
      case CREDIT_TYPE.REMOVE_CREDIT: {
        const usedBalance =
          currentTeamInfo.credit.volumeConverted -
          currentTeamInfo.credit.balanceConverted

        if (usedBalance > 0) {
          const minNum = Math.ceil(usedBalance / 5000)
          if (currentQuantity <= minNum) {
            message.info(t("tipi_billing.could_not_decrease"))
            return true
          }
        }
        break
      }
      default: {
        return false
      }
    }
  }

  const handleSubscribe = async () => {
    if (loading || !currentTeamInfo || !currentTeamInfo?.id) return
    const type = getCurrentCreditType(
      teamQuantity,
      currentQuantity ?? 1,
      isCancelSubscribe,
    )
    const isBlockSubscribe = getBlockSubscribeQuantity(type)
    if (!!isBlockSubscribe) return
    setLoading(true)
    const successRedirect = getSuccessRedirectWithParams({
      returnTo: window.location.href,
      from,
    })
    const cancelRedirect = window.location.href

    try {
      switch (type) {
        case CREDIT_TYPE.CANCEL_SUBSCRIPTION:
          TipisTrack.track("sidebar_click", {
            parameter1: from,
            parameter3: BILLING_REPORT_TYPE.UNSUBSCRIBE,
          })
          await cancelSubscribe(
            currentTeamInfo.id,
            SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID,
          )
          onSuccessCallback?.(currentTeamInfo.id, type)
          message.success({
            content: t("billing.message.unsubscription_suc"),
          })
          break
        case CREDIT_TYPE.MODIFY_SUBSCRIPTION:
          TipisTrack.track("sidebar_click", {
            parameter1: from,
            parameter3: BILLING_REPORT_TYPE.CHANGE_PLAN,
          })
          await modifySubscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
          })
          onSuccessCallback?.(currentTeamInfo.id, type)
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          break
        case CREDIT_TYPE.ADD_CREDIT:
        case CREDIT_TYPE.REMOVE_CREDIT:
          TipisTrack.track("sidebar_click", {
            parameter1: from,
            parameter3:
              teamQuantity > currentQuantity
                ? BILLING_REPORT_TYPE.REMOVE
                : BILLING_REPORT_TYPE.INCREASE,
          })
          await modifySubscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
          })
          onSuccessCallback?.(currentTeamInfo.id, type)
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          break
        default:
        case CREDIT_TYPE.SUBSCRIBE:
          TipisTrack.track("sidebar_click", {
            parameter1: from,
            parameter3: BILLING_REPORT_TYPE.SUBSCRIBE,
          })
          const res = await subscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
            successRedirect,
            cancelRedirect,
          })
          if (res.data.url) {
            window.open(res.data.url, "_self")
          }
      }
    } catch (error) {
      switch (type) {
        case CREDIT_TYPE.CANCEL_SUBSCRIPTION:
          message.error({
            content: t("billing.message.failed_to_unsubscrib"),
          })
          break
        case CREDIT_TYPE.ADD_CREDIT:
        case CREDIT_TYPE.REMOVE_CREDIT:
          message.error({
            content: t("billing.message.failed_to_change"),
          })
          break
        case CREDIT_TYPE.SUBSCRIBE:
        default:
          message.error({
            content: t("billing.message.error_subscribe"),
          })
      }
    } finally {
      setLoading(false)
      onCancel?.()
    }
  }

  useEffect(() => {
    if (visible) {
      TipisTrack.track("show_billing_sidebar", {
        parameter1: from,
      })
    }
  }, [from, visible])

  return (
    <Drawer
      open={visible}
      width={isMobile ? "100%" : "520px"}
      height="100%"
      placement={isMobile ? "bottom" : "right"}
      styles={{
        content: {
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
        },
        body: {
          padding: 0,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
      closable={false}
      footer={false}
      autoFocus={false}
      onClose={handleCancel}
      afterOpenChange={(open: boolean) => {
        !open && afterClose?.()
      }}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={titleContainerStyle}>
            <div css={titleStyle}>{t("tipi_billing.manage_credits")}</div>
            <div css={closeIconContainerStyle} onClick={onCancel}>
              <Icon component={CloseIcon} css={closeIconStyle} />
            </div>
          </div>
          <div css={manageContentStyle}>
            <div css={manageHeaderStyle}>
              <div>{t("tipi_billing.credit")}</div>
              <div css={managePriceStyle}>
                <span>
                  {t("tipi_billing.monthly_price_total", {
                    unitPrice: toThousands(
                      CREDIT_UNIT_PRICE[SUBSCRIPTION_CYCLE.MONTHLY],
                    ),
                    unitCredit: toThousands(
                      CREDIT_UNIT_BY_CYCLE[SUBSCRIPTION_CYCLE.MONTHLY],
                    ),
                  })}
                </span>
                <span>
                  {t("tipi_billing.annual_price_total", {
                    unitPrice: toThousands(
                      CREDIT_UNIT_PRICE[SUBSCRIPTION_CYCLE.YEARLY],
                    ),
                    unitCredit: toThousands(
                      CREDIT_UNIT_BY_CYCLE[SUBSCRIPTION_CYCLE.YEARLY],
                    ),
                  })}
                </span>
              </div>
            </div>
            <div css={manageItemStyle}>
              <Select
                value={cycle}
                options={paymentOptions}
                onChange={(v) => setCycle(v as SUBSCRIPTION_CYCLE)}
              />
              <InputNumber
                style={{
                  width: "100%",
                }}
                value={currentQuantity}
                onChange={(v) => setCurrentQuantity(v ?? 1)}
                min={isSubScribe ? 0 : 1}
              />
            </div>
          </div>
          <Divider
            style={{
              margin: 0,
            }}
          />
          <div css={accountsStyle}>
            <div css={subTotalStyle}>
              <div>{t("tipi_billing.total")}</div>
              <div css={priceStyle}>
                <div css={priceTotalStyle}>
                  ${(unitPrice * currentQuantity).toFixed(2)}
                </div>
                <div css={priceTotalLabelStyle}>
                  {`$${unitPrice} * ${currentQuantity}`}
                </div>
              </div>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    contentFontSizeLG: 14,
                    defaultBg: getColor("grayBlue", "02"),
                    defaultColor: "#fff",
                    defaultBorderColor: getColor("grayBlue", "02"),
                    defaultActiveBorderColor: getColor("grayBlue", "01"),
                    defaultActiveBg: getColor("grayBlue", "01"),
                    defaultActiveColor: "#fff",
                    defaultHoverBg: getColor("grayBlue", "03"),
                    defaultHoverColor: "#fff",
                    defaultHoverBorderColor: getColor("grayBlue", "03"),
                  },
                },
              }}
            >
              <Button
                block
                size="large"
                disabled={disabledSubscribe}
                loading={loading}
                style={{
                  marginTop: "16px",
                }}
                className={
                  getCurrentCreditType(
                    teamQuantity,
                    currentQuantity ?? 1,
                    isCancelSubscribe,
                  ) === CREDIT_TYPE.SUBSCRIBE && !disabledSubscribe
                    ? SUBSCRIBE_CLASS_NAME
                    : ""
                }
                onClick={handleSubscribe}
              >
                {t(btnText)}
              </Button>
            </ConfigProvider>
          </div>
          {!hiddenCalculator && (
            <Calculator
              changeNum={calculatorNum}
              unitCreditByCycle={unitCreditByCycle}
            />
          )}
        </div>
        <div css={descriptionStyle}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  fontSize: 12,
                  paddingBlock: 0,
                  paddingInline: 0,
                },
              },
            }}
          >
            <Trans
              i18nKey={t(description)}
              t={t}
              components={[
                <Button
                  type="link"
                  key={LEARN_MORE_LINK}
                  href={LEARN_MORE_LINK}
                  target="__blank"
                />,
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
    </Drawer>
  )
}

CreditDrawer.displayName = "CreditDrawer"
