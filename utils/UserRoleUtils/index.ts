import { SUBSCRIBE_PLAN, TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { getPlanUtils } from "@illa-public/user-data"
import { AttributeConfigList } from "./attributeConfigList"
import { FreePlanAttributeConfigList } from "./freePlanAttributeConfigList"
import {
  ACTION_ACCESS,
  ACTION_MANAGE,
  ATTRIBUTE_CATEGORY,
  ATTRIBUTE_GROUP,
} from "./interface"
import { InvalidedSubscribePlanAttributeConfigList } from "./invalidedSubscribePlanAttributeConfigList"

export * from "./interface"

export const USER_ROLE_ARRAY = [
  USER_ROLE.OWNER,
  USER_ROLE.ADMIN,
  USER_ROLE.EDITOR,
  USER_ROLE.VIEWER,
  USER_ROLE.GUEST,
]
export const filterUserRole = (
  roles: USER_ROLE[],
  filterRole: USER_ROLE[] = [],
) => {
  if (Array.isArray(filterRole) && filterRole.length > 0) {
    return roles.filter((role) => !filterRole.includes(role))
  }
  return roles
}
export const getSmallThanTargetRole = (
  targetRole: USER_ROLE,
  notHasSelf: boolean = true,
  filterRole: USER_ROLE[] = [],
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const result = notHasSelf
    ? USER_ROLE_ARRAY.slice(targetRoleIndex + 1)
    : USER_ROLE_ARRAY.slice(targetRoleIndex)
  return filterUserRole(result, filterRole)
}

export const getBiggerThanTargetRole = (
  targetRole: USER_ROLE,
  notHasSelf: boolean = true,
  filterRole: USER_ROLE[] = [],
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const result = notHasSelf
    ? USER_ROLE_ARRAY.slice(0, targetRoleIndex)
    : USER_ROLE_ARRAY.slice(0, targetRoleIndex + 1)
  return filterUserRole(result, filterRole)
}

export const isSmallThanTargetRole = (
  targetRole: USER_ROLE,
  currentUserRole: USER_ROLE,
  isEqual: boolean = true,
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  if (targetRoleIndex === -1 || currentUserRoleIndex === -1) return true
  return isEqual
    ? currentUserRoleIndex >= targetRoleIndex
    : currentUserRoleIndex > targetRoleIndex
}

export const isBiggerThanTargetRole = (
  targetRole: USER_ROLE,
  currentUserRole: USER_ROLE,
  isEqual: boolean = true,
) => {
  const targetRoleIndex = USER_ROLE_ARRAY.indexOf(targetRole)
  const currentUserRoleIndex = USER_ROLE_ARRAY.indexOf(currentUserRole)
  if (targetRoleIndex === -1 || currentUserRoleIndex === -1) return false
  return isEqual
    ? currentUserRoleIndex <= targetRoleIndex
    : currentUserRoleIndex < targetRoleIndex
}

interface InviteRoleAttributeMap {
  [key: string]: number
}

export const inviteRoleAttributeMap: InviteRoleAttributeMap = {
  [USER_ROLE.OWNER]: ACTION_ACCESS.INVITE_OWNER,
  [USER_ROLE.ADMIN]: ACTION_ACCESS.INVITE_ADMIN,
  [USER_ROLE.EDITOR]: ACTION_ACCESS.INVITE_EDITOR,
  [USER_ROLE.VIEWER]: ACTION_ACCESS.INVITE_VIEWER,
}

export const getAttribute = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.CREDIT_FREE,
) => {
  switch (teamPlan) {
    case SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_CANCELED:
    case SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_PAID: {
      return {
        accessAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[userRole]?.[
            attributeGroup
          ],
        deleteAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[userRole]?.[
            attributeGroup
          ],
        manageAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[userRole]?.[
            attributeGroup
          ],
        specialAttribute:
          AttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[userRole]?.[
            attributeGroup
          ],
      }
    }
    case SUBSCRIBE_PLAN.CREDIT_SUBSCRIBE_INSUFFICIENT: {
      return {
        accessAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.ACCESS
          ]?.[userRole]?.[attributeGroup],
        deleteAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.DELETE
          ]?.[userRole]?.[attributeGroup],
        manageAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.MANAGE
          ]?.[userRole]?.[attributeGroup],
        specialAttribute:
          InvalidedSubscribePlanAttributeConfigList?.[
            ATTRIBUTE_CATEGORY.SPECIAL
          ]?.[userRole]?.[attributeGroup],
      }
    }
    default: {
      return {
        accessAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.ACCESS]?.[
            userRole
          ]?.[attributeGroup],
        deleteAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.DELETE]?.[
            userRole
          ]?.[attributeGroup],
        manageAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.MANAGE]?.[
            userRole
          ]?.[attributeGroup],
        specialAttribute:
          FreePlanAttributeConfigList?.[ATTRIBUTE_CATEGORY.SPECIAL]?.[
            userRole
          ]?.[attributeGroup],
      }
    }
  }
}

export const canAccess = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.CREDIT_FREE,
  attribute: ACTION_ACCESS,
) => {
  const accessAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).accessAttribute
  return !!accessAttribute?.[attribute]
}

export const canManage = (
  userRole: USER_ROLE,
  attributeGroup: ATTRIBUTE_GROUP,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.CREDIT_FREE,
  attribute: ACTION_MANAGE,
) => {
  const manageAttribute = getAttribute(
    userRole,
    attributeGroup,
    teamPlan,
  ).manageAttribute
  return !!manageAttribute?.[attribute]
}

export const canManagePayment = (
  userRole: USER_ROLE = USER_ROLE.VIEWER,
  teamPlan: SUBSCRIBE_PLAN = SUBSCRIBE_PLAN.CREDIT_FREE,
) => {
  const manageAttribute = getAttribute(
    userRole,
    ATTRIBUTE_GROUP.BILLING,
    teamPlan,
  ).manageAttribute

  return !!manageAttribute?.[ACTION_MANAGE.PAYMENT]
}

export const canManageInvite = (
  currentUserRole: USER_ROLE,
  allowEditorManageTeamMember?: boolean,
  allowViewerManageTeamMember?: boolean,
) => {
  if (allowViewerManageTeamMember && allowEditorManageTeamMember) {
    return isBiggerThanTargetRole(USER_ROLE.VIEWER, currentUserRole)
  } else {
    return [USER_ROLE.OWNER, USER_ROLE.ADMIN].includes(currentUserRole)
  }
}

export const showInviteModal = (teamInfo?: TeamInfo) => {
  if (!teamInfo) return false
  return canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
}

export const openShareAppModal = (
  teamInfo: TeamInfo,
  userRoleForThisApp: USER_ROLE,
  isPublic: boolean,
  isContributed: boolean,
) => {
  if (isPublic || isContributed) {
    return true
  } else if (
    canManage(
      userRoleForThisApp,
      ATTRIBUTE_GROUP.APP,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.EDIT_APP,
    )
  ) {
    return true
  } else
    return canManageInvite(
      teamInfo.myRole,
      teamInfo.permission.allowEditorManageTeamMember,
      teamInfo.permission.allowViewerManageTeamMember,
    )
}

export const showShareAgentModal = (
  teamInfo: TeamInfo,
  userRoleForThisAgent: USER_ROLE,
  isContributed: boolean,
) => {
  const canInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
  if (isContributed) {
    return true
  } else if (canInvite) {
    return true
  } else {
    return canManage(
      userRoleForThisAgent,
      ATTRIBUTE_GROUP.AI_AGENT,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.CREATE_AI_AGENT,
    )
  }
}

export const showShareAgentModalOnlyForShare = (teamInfo: TeamInfo) => {
  return canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
}

export const openShareAgentModal = (
  teamInfo: TeamInfo,
  userRoleForThisAgent: USER_ROLE,
  isContributed: boolean,
) => {
  if (isContributed) {
    return true
  } else if (
    canManage(
      userRoleForThisAgent,
      ATTRIBUTE_GROUP.AI_AGENT,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.CREATE_AI_AGENT,
    )
  ) {
    return true
  } else {
    return canManageInvite(
      teamInfo.myRole,
      teamInfo.permission.allowEditorManageTeamMember,
      teamInfo.permission.allowViewerManageTeamMember,
    )
  }
}

export const canAccessMember = (teamInfo?: TeamInfo) => {
  if (!teamInfo) return false
  return canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )
}
