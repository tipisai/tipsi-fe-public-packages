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

export interface ICreditInfo {
  volume: number
  volumeConverted: number
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

// new data types
export interface ITeamInfoVO {
  id: string
  avatarUrl: string
  identify: string
  name: string
  createdAt: string

  // temp
  myRole: USER_ROLE
  credit: ICreditInfo
  teamMemberID: string
  permission: {
    inviteLinkEnabled: boolean
  }
}

export interface IMemberVO {
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
