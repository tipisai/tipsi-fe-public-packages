import Icon from "@ant-design/icons"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  USER_ROLE,
} from "@illa-public/public-types"
import { getCurrentTeamInfo, getCurrentUserID } from "@illa-public/user-data"
import { isMobileByWindowSize } from "@illa-public/utils"
import { App, ConfigProvider, Divider, Drawer, InputNumber, Select } from "antd"
import { Button } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import { COLLAR_TYPE, PURCHASE_TYPE } from "../../interface"
import { cancelSubscribe, modifySubscribe, subscribe } from "../../service"
import {
  COLLAR_UNIT_BY_CYCLE,
  COLLAR_UNIT_PRICE,
} from "../../service/interface"
import {
  getSuccessRedirectWithParams,
  isSubscribeForDrawer,
  track,
} from "../../utils"
import { Calculator } from "../Calculator"
import {
  COLLAR_BUTTON_TEXT,
  COLLAR_MORE_TEXT,
  LEARN_MORE_LINK,
} from "./constants"
import { CollarDrawerProps } from "./interface"
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
import { getBtnText, getCurrentCollarType, getDescription } from "./utils"

export const CollarDrawer: FC<CollarDrawerProps> = (props) => {
  const { onCancel, visible, afterClose, onSuccessCallback, from, subCycle } =
    props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [loading, setLoading] = useState<boolean>(false)
  const { message } = App.useApp()

  const paymentOptions = [
    {
      label: t("billing.payment_sidebar.select_option.Yearly"),
      value: SUBSCRIPTION_CYCLE.YEARLY,
    },
    {
      label: t("billing.payment_sidebar.select_option.Monthly"),
      value: SUBSCRIPTION_CYCLE.MONTHLY,
    },
  ]

  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const userID = useSelector(getCurrentUserID)

  const isSubScribe = isSubscribeForDrawer(currentTeamInfo?.colla?.plan)
  const isCancelSubscribe =
    currentTeamInfo?.colla?.plan === SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_CANCELED

  const teamQuantity = isSubScribe ? currentTeamInfo?.colla?.quantity ?? 0 : 0
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    teamQuantity + 1,
  )
  const [cycle, setCycle] = useState<SUBSCRIPTION_CYCLE>(
    isSubScribe
      ? currentTeamInfo?.colla?.cycle ?? SUBSCRIPTION_CYCLE.MONTHLY
      : subCycle ?? SUBSCRIPTION_CYCLE.MONTHLY,
  )

  const currentCollarType = useRef<COLLAR_TYPE>(
    getCurrentCollarType(teamQuantity, currentQuantity, isCancelSubscribe),
  )

  const disabledSubscribe =
    (currentQuantity === teamQuantity &&
      cycle === currentTeamInfo?.colla?.cycle) ||
    (currentQuantity === 0 && cycle !== currentTeamInfo?.colla?.cycle)

  const changeNum = Math.abs(teamQuantity - currentQuantity)

  const [description, setDescription] = useState(
    getDescription(currentCollarType.current),
  )

  const [btnText, setBtnText] = useState(getBtnText(currentCollarType.current))

  const unitPrice = COLLAR_UNIT_PRICE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]
  const unitCollaByCycle =
    COLLAR_UNIT_BY_CYCLE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]

  const calculatorNum =
    currentTeamInfo?.colla?.cycle === cycle ? changeNum : currentQuantity

  const reportElement = isSubScribe ? "colla_manage" : "colla_subscribe"

  const handleNumChange = (value: number | null) => {
    setCurrentQuantity(value ?? 1)
    if (currentTeamInfo?.colla?.cycle !== cycle && isSubScribe) {
      setBtnText(COLLAR_BUTTON_TEXT.MONTH_YEAR_UPDATE)
      setDescription(COLLAR_MORE_TEXT.MONTH_YEAR_UPDATE)
    } else {
      currentCollarType.current = getCurrentCollarType(teamQuantity, value ?? 1)
      setBtnText(getBtnText(currentCollarType.current))
      setDescription(getDescription(currentCollarType.current))
    }
  }

  const handleOnSelectChange = (value?: SUBSCRIPTION_CYCLE) => {
    setCycle(value as SUBSCRIPTION_CYCLE)
    if (currentTeamInfo?.colla?.cycle !== value && isSubScribe) {
      setBtnText(COLLAR_BUTTON_TEXT.MONTH_YEAR_UPDATE)
      setDescription(COLLAR_MORE_TEXT.MONTH_YEAR_UPDATE)
    } else {
      setBtnText(getBtnText(currentCollarType.current))
      setDescription(getDescription(currentCollarType.current))
    }
  }

  const handleCancel = () => {
    setCurrentQuantity(teamQuantity + 1)
    onCancel?.()
  }

  const hiddenCalculator =
    currentQuantity === 0 ||
    // not modify cycle
    (changeNum === 0 && currentTeamInfo?.colla?.cycle === cycle)
  // not cancel subscribe
  currentCollarType.current !== COLLAR_TYPE.CANCEL_SUBSCRIPTION

  const handleSubscribe = async () => {
    if (loading || !currentTeamInfo || !currentTeamInfo?.id) return
    setLoading(true)
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "billing_side_bar_upgrade_or_manage_button",
        parameter1: from,
        parameter2: reportElement,
      },
      USER_ROLE[currentTeamInfo?.myRole],
      currentTeamInfo?.id,
      userID,
    )
    const successRedirect = getSuccessRedirectWithParams({
      returnTo: window.location.href,
      purchaseStatus: "success",
      purchaseType: PURCHASE_TYPE.COLLA,
      userID,
      purchaseCount: currentQuantity,
      purchaseValue: unitPrice * currentQuantity,
    })
    const cancelRedirect = window.location.href
    try {
      switch (currentCollarType.current) {
        case COLLAR_TYPE.CANCEL_SUBSCRIPTION:
          await cancelSubscribe(
            currentTeamInfo.id,
            currentTeamInfo.colla?.plan || SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
          )
          onSuccessCallback?.(currentTeamInfo.id, currentCollarType.current)
          message.success({
            content: t("billing.message.unsubscription_suc"),
          })
          break
        case COLLAR_TYPE.MODIFY_SUBSCRIPTION:
          await modifySubscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
          })
          onSuccessCallback?.(currentTeamInfo.id, currentCollarType.current)
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          break
        case COLLAR_TYPE.ADD_COLLAR:
        case COLLAR_TYPE.REMOVE_COLLAR:
          await modifySubscribe(currentTeamInfo.id, {
            plan:
              currentTeamInfo.colla?.plan ??
              SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
          })
          onSuccessCallback?.(currentTeamInfo.id, currentCollarType.current)
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          break
        default:
        case COLLAR_TYPE.SUBSCRIBE:
          const res = await subscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
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
      switch (currentCollarType.current) {
        case COLLAR_TYPE.CANCEL_SUBSCRIPTION:
          message.error({
            content: t("billing.message.failed_to_unsubscrib"),
          })
          break
        case COLLAR_TYPE.ADD_COLLAR:
        case COLLAR_TYPE.REMOVE_COLLAR:
          message.error({
            content: t("billing.message.failed_to_change"),
          })
          break
        case COLLAR_TYPE.SUBSCRIBE:
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
    from &&
      visible &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "billing_side_bar",
          parameter1: from,
          parameter2: reportElement,
        },
        USER_ROLE[currentTeamInfo?.myRole],
        currentTeamInfo?.id,
        userID,
      )
  }, [
    currentTeamInfo?.id,
    currentTeamInfo?.myRole,
    from,
    userID,
    visible,
    reportElement,
  ])

  return (
    <Drawer
      open={visible}
      width={isMobile ? "100%" : "520px"}
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
            <div css={titleStyle}>
              {t("billing.payment_sidebar.title.colla")}
            </div>
            <div css={closeIconContainerStyle} onClick={onCancel}>
              <Icon component={CloseIcon} css={closeIconStyle} />
            </div>
          </div>
          <div css={manageContentStyle}>
            <div css={manageHeaderStyle}>
              <div>{t("billing.payment_sidebar.plan_label.colla")}</div>
              <div css={managePriceStyle}>
                <span>
                  {t("billing.payment_sidebar.price.colla_monthly", {
                    price: `$${COLLAR_UNIT_PRICE[SUBSCRIPTION_CYCLE.MONTHLY]}`,
                  })}
                </span>
                <span>
                  {t("billing.payment_sidebar.price.colla_yearly", {
                    price: `$${COLLAR_UNIT_PRICE[SUBSCRIPTION_CYCLE.YEARLY]}`,
                  })}
                </span>
              </div>
            </div>
            <div css={manageItemStyle}>
              <Select
                value={cycle}
                options={paymentOptions}
                onChange={handleOnSelectChange}
              />
              <InputNumber
                style={{
                  width: "100%",
                }}
                value={currentQuantity}
                onChange={handleNumChange}
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
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div css={priceStyle}>
                <div css={priceTotalStyle}>
                  ${(unitPrice * currentQuantity).toFixed(2)}
                </div>
                <div css={priceTotalLabelStyle}>
                  {t("billing.payment_sidebar.price_cal.colla", {
                    unitPrice: `$${unitPrice}`,
                    purchaseNum: currentQuantity,
                  })}
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
                onClick={handleSubscribe}
              >
                {t(btnText, {
                  changeNum: `${changeNum * unitCollaByCycle}k`,
                })}
              </Button>
            </ConfigProvider>
          </div>
          {!hiddenCalculator && (
            <Calculator
              changeNum={calculatorNum}
              unitCollaByCycle={unitCollaByCycle}
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
              i18nKey={t(description, {
                changeNum: `${changeNum * unitCollaByCycle}k`,
              })}
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

CollarDrawer.displayName = "CollarDrawer"
