import Icon from "@ant-design/icons"
import { DoubtIcon, DownIcon } from "@illa-public/icon"
import { USER_ROLE } from "@illa-public/public-types"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { RoleSelectorProps } from "./interface"

export const RoleSelector: FC<RoleSelectorProps> = (props) => {
  const {
    onClickItem,
    withoutTips,
    value,
    currentUserRole,
    isSelf,
    excludeUserRole,
  } = props

  const canEdit =
    !isSelf && isBiggerThanTargetRole(value, currentUserRole, true)

  const { t } = useTranslation()

  const userRoleItems = useMemo(() => {
    return [
      {
        role: USER_ROLE.OWNER,
        tips: t("user_management.role.tips.owner"),
        name: t("user_management.role.owner"),
      },
      {
        role: USER_ROLE.ADMIN,
        tips: t("user_management.role.tips.admin"),
        name: t("user_management.role.admin"),
      },
      {
        role: USER_ROLE.EDITOR,
        tips: t("user_management.role.tips.editor"),
        name: t("user_management.role.editor"),
      },
      {
        role: USER_ROLE.VIEWER,
        tips: t("user_management.role.tips.viewer"),
        name: t("user_management.role.viewer"),
      },
    ]
  }, [t])

  const dropUserRole = useMemo(() => {
    return userRoleItems
      .filter((i) => i.role !== USER_ROLE.OWNER)
      .filter(
        (i) =>
          !excludeUserRole?.includes(i.role) &&
          isBiggerThanTargetRole(i.role, currentUserRole),
      )
  }, [currentUserRole, excludeUserRole, userRoleItems])

  const menuItems: MenuProps["items"] = dropUserRole.map((item) => ({
    key: item.role,
    label: (
      <Space size="small">
        {item.name}
        {!withoutTips && (
          <Tooltip title={item.tips} placement="top">
            <Icon component={DoubtIcon} />
          </Tooltip>
        )}
      </Space>
    ),
  }))
  const menuClick: MenuProps["onClick"] = ({ key }) => {
    onClickItem?.(Number(key))
  }

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: menuClick,
      }}
    >
      <Button type="text">
        <Space>
          {userRoleItems.find((item) => item.role === value)?.name}
          {canEdit && dropUserRole.length > 1 && <Icon component={DownIcon} />}
        </Space>
      </Button>
    </Dropdown>
  )
}
