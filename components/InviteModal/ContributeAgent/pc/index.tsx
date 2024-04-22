import { App, Modal } from "antd"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { TagControllerPC } from "../../component/TagController/pc"
import { ContributeAgentProps } from "../interface"
import { contributeAgentWithHashtags, updateAgentContribute } from "../service"

export const ContributeAgentPC: FC<ContributeAgentProps> = (props) => {
  const [contributeLoading, setContributeLoading] = useState(false)
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])
  const { t } = useTranslation()
  const { message } = App.useApp()

  return (
    <Modal
      closable={true}
      onCancel={() => {
        props.onClose?.()
      }}
      maskClosable={false}
      open={true}
      closeIcon={!props.productContributed ? null : undefined}
      okText={
        props.productContributed
          ? t("contribute.update_modal.button")
          : t("contribute.first_time_modal.button")
      }
      centered
      onOk={async () => {
        setContributeLoading(true)
        try {
          if (props.productContributed) {
            await updateAgentContribute(
              props.teamID,
              props.productID,
              currentHashtags,
              true, // TODO:  publishConfiguration or not
            )
          } else {
            await contributeAgentWithHashtags(
              props.teamID,
              props.productID,
              currentHashtags,
              true, // TODO:  publishConfiguration or not
            )
          }
          props.onContributed?.(true)
          props.onClose?.()
        } catch (e) {
          message.error({
            content: t("user_management.modal.message.make_public_failed"),
          })
        } finally {
          setContributeLoading(false)
        }
      }}
      okButtonProps={{
        danger: true,
        loading: contributeLoading,
      }}
      title={
        props.productContributed
          ? t("contribute.update_modal.title")
          : t("contribute.first_time_modal.title")
      }
    >
      <TagControllerPC
        productID={props.productID}
        productType={props.productType}
        productContributed={props.productContributed}
        onTagChange={(tags) => {
          setCurrentHashtags(tags)
        }}
      />
    </Modal>
  )
}

ContributeAgentPC.displayName = "ContributeAgentPC"
