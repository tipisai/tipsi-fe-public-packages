import { USER_ROLE, USER_STATUS } from "../user"

export interface MemberInfo {
  teamMemberID: string
  userID: string
  nickname: string
  email: string
  avatar: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  permission: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface TeamMemberPermission {
  blockRegister: boolean
  inviteLinkEnabled: boolean
  allowViewerInvite: boolean
  allowEditorInvite: boolean
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
}

export interface TeamMemberPermissionConfig {
  config: number
}

export interface TeamPersonalConfig {
  teamLicenseSubscribeExpiredPopupShowed: boolean
  teamLicenseSubscribeExpiredBannerShowed: boolean
}

export enum SUBSCRIBE_PLAN {
  UNDEFINED = "undefined",
  CREDIT_FREE = "credit_free",
  CREDIT_SUBSCRIBE_PAID = "credit_subscribe_paid",
  CREDIT_SUBSCRIBE_INSUFFICIENT = "credit_subscribe_insufficient",
  CREDIT_SUBSCRIBE_CANCELED = "credit_subscribe_canceled",
  CREDIT_SUBSCRIBE_EXPIRED = "credit_subscribe_expired",
}

export enum SUBSCRIPTION_CYCLE {
  FREE = 0,
  MONTHLY = 1,
  YEARLY = 2,
  LIFETIME = 3,
}

export interface SubscribeInfo {
  volume: number
  balance: number
  quantity: number
  plan: SUBSCRIBE_PLAN
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  totalAmount: number
  cancelAtPeriodEnd: boolean
  invoiceURL: string
}

export interface TotalTeamLicense {
  volume: number
  balance: number
  teamLicensePurchased: boolean
  teamLicenseAllPaid: boolean
}

export interface ICreditInfo {
  volume: number
  balance: number
  balanceConverted: number
  quantity: number
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  totalAmount: number
  plan: SUBSCRIBE_PLAN
  cancelAtPeriodEnd: boolean
  bonus: number
  bonusConverted: number
}

export interface ITeamCustomInfo {
  customDomain: string
  favicon: string
  title: string
}

export interface TeamInfo {
  id: string
  uid: string
  name: string
  icon: string
  identifier: string
  teamMemberID: string
  currentTeamLicense: SubscribeInfo
  appSumoTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  personalConfig: TeamPersonalConfig
  myRole: USER_ROLE
  permission: TeamMemberPermission
  teamMemberPermission: TeamMemberPermissionConfig
  credit: ICreditInfo
  customInfo: ITeamCustomInfo
}

export interface Team {
  items?: TeamInfo[]
  currentId?: string
  currentMemberList?: MemberInfo[]
}

export interface UpdateTransUserRolePayload {
  teamMemberID: string
}

export interface UpdateTeamMemberUserRolePayload {
  teamMemberID: string
  userRole: USER_ROLE
}

export interface UpdateTeamMemberPermissionPayload {
  teamID: string
  newPermission: Partial<TeamMemberPermission>
}

export interface UpdateTeamSubscribePayload {
  teamID: string
  subscribeInfo: SubscribeInfo
}
