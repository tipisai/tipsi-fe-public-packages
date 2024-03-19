import Icon from "@ant-design/icons"
import { Button } from "antd"
import { App, ConfigProvider, Divider, Drawer, InputNumber } from "antd"
import { FC, useMemo, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { getCurrentId } from "@illa-public/user-data"
import { isMobileByWindowSize } from "@illa-public/utils"
import { WooModalType } from "../../interface"
import { modifySubscribe, subscribe } from "../../service"
import { UNIT_WOO_BY_STORAGE } from "../../service/interface"
import { handleWooPurchaseError, isSubscribeForDrawer } from "../../utils"
import { LEARN_MORE_LINK } from "./constants"
import { StorageDrawerProps } from "./interface"
import {
  closeIconStyle,
  descriptionStyle,
  drawerContentStyle,
  drawerPaddingStyle,
  manageContentStyle,
  manageItemStyle,
  priceStyle,
  priceTotalLabelStyle,
  priceTotalStyle,
  subTotalStyle,
  titleStyle,
} from "./style"
import { geButtonText, getDescText } from "./utils"

export const StorageDrawer: FC<StorageDrawerProps> = (props) => {
  const { visible, config, onCancel, afterClose } = props
  const { driveVolume, successCallBack } = config
  const { volumeConverted = 0, balanceConverted = 0 } = driveVolume || {}

  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  const { message } = App.useApp()
  const teamID = useSelector(getCurrentId)
  const used = Math.ceil(volumeConverted - balanceConverted)

  const [quantity, setQuantity] = useState<number>(driveVolume?.quantity || 1)
  const [loading, setLoading] = useState<boolean>(false)

  const actionDisabled = useMemo(() => {
    return driveVolume?.quantity === quantity
  }, [driveVolume, quantity])

  const description = useMemo(() => {
    const desc = getDescText(quantity, driveVolume)
    const changeQuantity = Math.abs(quantity - (driveVolume?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(desc, { changeNum }) ?? ""
  }, [driveVolume, quantity, t])

  const actionButtonText = useMemo(() => {
    const btnText = geButtonText(quantity, driveVolume)
    const changeQuantity = Math.abs(quantity - (driveVolume?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(btnText, { changeNum }) ?? ""
  }, [driveVolume, quantity, t])

  const handleSubscribe = async () => {
    if (loading || !teamID) return
    setLoading(true)
    try {
      if (driveVolume?.plan && isSubscribeForDrawer(driveVolume?.plan)) {
        await modifySubscribe(teamID, {
          plan: driveVolume?.plan ?? SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID,
          quantity,
          cycle: SUBSCRIPTION_CYCLE.MONTHLY,
        })
        message.success(t("billing.message.successfully_changed"))
      } else {
        await subscribe(teamID, {
          plan: SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID,
          quantity,
          cycle: SUBSCRIPTION_CYCLE.MONTHLY,
        })
        message.success(t("billing.message.successfully_changed"))
      }
      successCallBack?.(teamID)
    } catch (error) {
      const res = handleWooPurchaseError(
        error,
        WooModalType.STORAGE,
        "billing_storage_balance_manage",
      )
      if (res) return
      if (driveVolume?.plan && isSubscribeForDrawer(driveVolume?.plan)) {
        message.error(t("billing.message.failed_to_change"))
      } else {
        message.error(t("billing.message.error_subscribe"))
      }
    } finally {
      setLoading(false)
      onCancel?.()
    }
  }

  const handleNumberChange = (value: number | null) => {
    if (quantity < used) return
    setQuantity(value ?? 0)
  }

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
      onClose={onCancel}
      afterOpenChange={(open: boolean) => {
        !open && afterClose?.()
      }}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={drawerPaddingStyle}>
            <Icon
              component={CloseIcon}
              css={closeIconStyle}
              onClick={onCancel}
            />
            <div css={titleStyle}>
              {t("billing.payment_sidebar.title.manage_storage")}
            </div>
            <div css={manageContentStyle}>
              <label>{t("billing.payment_sidebar.plan_label.Storage")}</label>
              <div css={manageItemStyle}>
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  value={quantity}
                  onChange={handleNumberChange}
                  min={used || 1}
                />
              </div>
            </div>
          </div>
          <Divider
            style={{
              margin: 0,
            }}
          />
          <div css={drawerPaddingStyle}>
            <div css={subTotalStyle}>
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div css={priceStyle}>
                <div css={priceTotalStyle}>
                  {UNIT_WOO_BY_STORAGE * quantity}K Woo
                </div>
                <div css={priceTotalLabelStyle}>
                  {t(
                    "billing.payment_sidebar.price_cal.next_period_monthly_remove_storage",
                    {
                      unitPrice: `${UNIT_WOO_BY_STORAGE}K Woo`,
                      storageNum: quantity,
                    },
                  )}
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
                style={{
                  marginTop: "16px",
                }}
                disabled={actionDisabled}
                loading={loading}
                onClick={handleSubscribe}
              >
                {actionButtonText}
              </Button>
            </ConfigProvider>
          </div>
        </div>
        <div css={drawerPaddingStyle}>
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
                i18nKey={description}
                t={t}
                components={[
                  <Button
                    type="link"
                    target="__blank"
                    key={LEARN_MORE_LINK}
                    href={LEARN_MORE_LINK}
                  />,
                ]}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

StorageDrawer.displayName = "StorageDrawer"
