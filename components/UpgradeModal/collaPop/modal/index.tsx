import { App } from "antd"
import { FC, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { CreditModal } from "../../component/CreditModal"
import { OPERATION_NO_PERMISSION } from "../constants"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const UpgradeCreditModal: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const { message } = App.useApp()
  const { t } = useTranslation()
  const canManageThisCredit = canManagePayment(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
  )

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal())
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  const collarModal = useMemo(() => {
    if (!modal) return null
    if (!currentTeamInfo || !canManageThisCredit) {
      message.info(t(OPERATION_NO_PERMISSION[modal.modalType]))
      modalStore.remove()
      return null
    }
    return (
      <CreditModal
        modalType={modal.modalType}
        visible={modal.visible}
        from={modal.from}
        onCancel={() => {
          if (modal.id) {
            modalStore.update({ ...modal, visible: false })
          }
        }}
        afterClose={() => modalStore.remove()}
      />
    )
  }, [canManageThisCredit, currentTeamInfo, message, modal, t])

  return <>{collarModal}</>
}

UpgradeCreditModal.displayName = "UpgradeCreditModal"
