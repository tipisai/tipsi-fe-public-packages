import Icon from "@ant-design/icons"
import { getColor } from "@illa-public/color-scheme"
import { UpgradeIcon } from "@illa-public/icon"
import { CloseIcon, DoubtIcon } from "@illa-public/icon"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  USER_ROLE,
} from "@illa-public/public-types"
import { getCurrentTeamInfo, getCurrentUserID } from "@illa-public/user-data"
import { getILLACloudURL } from "@illa-public/utils"
import { Button, ConfigProvider, Modal, Tooltip } from "antd"
import { FC, useCallback, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { isSubscribeForDrawer, track } from "../../utils"
import TipIcon from "./assets/pricing-tip.svg?react"
import ModalDecorate from "./assets/upgrad-modal-bg.svg?react"
import {
  FEATURE_CONFIG,
  HIGHLIGHT_MAP,
  UPGRADE_MODAL_CONFIG_KEY,
} from "./constants"
import { UpgradeModalProps } from "./interface"
import {
  applyCardListStyle,
  decorateStyle,
  descriptionStyle,
  doubtStyle,
  footerStyle,
  headerStyle,
  highlightStyle,
  iconStyle,
  modalCloseIconStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
} from "./style"

export const SubscriptionReminderModal: FC<UpgradeModalProps> = (props) => {
  const {
    visible,
    from,
    configType = "upgrade",
    onCancel,
    handleLicenseDrawerVisible,
    afterClose,
  } = props
  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const userID = useSelector(getCurrentUserID)

  const { title, description, buttonText } = useMemo(() => {
    return UPGRADE_MODAL_CONFIG_KEY[configType]
  }, [configType])

  const highlight = useMemo(() => {
    return HIGHLIGHT_MAP?.[configType]
  }, [configType])

  const billingUrl = useMemo(() => {
    if (!teamInfo?.identifier) return ""
    return `${getILLACloudURL(
      window.customDomain,
    )}/setting/${teamInfo?.identifier}/billing`
  }, [teamInfo?.identifier])

  const openDrawer = useCallback(() => {
    const currentTeamLicense = teamInfo?.currentTeamLicense
    onCancel?.()
    handleLicenseDrawerVisible(true, {
      subscribeInfo: {
        quantity: currentTeamLicense?.cancelAtPeriodEnd
          ? 1
          : currentTeamLicense?.volume ?? 1,
        cycle: currentTeamLicense?.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
        plan: currentTeamLicense?.plan ?? SUBSCRIBE_PLAN.TEAM_LICENSE_FREE,
        cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
      },
    })
  }, [onCancel, teamInfo?.currentTeamLicense, handleLicenseDrawerVisible])

  const isSubscribe = isSubscribeForDrawer(teamInfo?.currentTeamLicense?.plan)
  const reportElement = isSubscribe
    ? "license_increase_modal"
    : "license_subscribe_modal"

  useEffect(() => {
    teamInfo?.myRole &&
      visible &&
      from &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        { element: reportElement, parameter1: from },
        USER_ROLE[teamInfo?.myRole],
        teamInfo?.id,
        userID,
      )
  }, [from, reportElement, teamInfo?.id, teamInfo?.myRole, userID, visible])

  return (
    <Modal
      open={visible}
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
      afterClose={afterClose}
      closeIcon={false}
      centered
      styles={{
        content: {
          padding: 0,
          width: "100%",
          maxWidth: 486,
          boxShadow: "0 4px 16px rgb(0 0 0 / 8%)",
          border: `1px solid ${getColor("grayBlue", "08")}`,
          overflow: "hidden",
          borderRadius: 8,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <Icon component={CloseIcon} />
      </div>
      <ModalDecorate css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>
          {highlight ? <span css={highlightStyle}>{t(highlight)}</span> : null}
          <span>{t(description)}</span>
        </div>
      </div>
      <div>
        {FEATURE_CONFIG.map(({ label, tip }, i) => {
          return (
            <div css={applyCardListStyle(label)} key={`${label}${i}`}>
              {label && <TipIcon css={iconStyle} />}
              <span>{t(label)}</span>
              {tip && (
                <Tooltip
                  trigger="hover"
                  title={t(tip)}
                  color={getColor("techPurple", "03")}
                >
                  <span css={doubtStyle}>
                    <Icon component={DoubtIcon} css={iconStyle} />
                  </span>
                </Tooltip>
              )}
            </div>
          )
        })}
        <div css={applyCardListStyle("learn_more")}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  paddingContentHorizontal: 4,
                  paddingInline: 1,
                },
              },
            }}
          >
            <Button type="link" href={billingUrl} target="__blank">
              {t("billing.modal.upgrade_now_admin.learn_more")}
            </Button>
          </ConfigProvider>
        </div>
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>$16.7</div>
            <div css={priceContentStyle}>
              {t("billing.modal.upgrade_now_admin.pricing")}
            </div>
          </div>
          <Button
            size="large"
            type="primary"
            icon={<UpgradeIcon />}
            onClick={openDrawer}
          >
            {t(buttonText)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

SubscriptionReminderModal.displayName = "SubscriptionReminderModal"
