import { ICreditInfo, USER_ROLE } from "@illa-public/public-types"

export interface ICreditUsageInfoResponse {
  toolCallUsage: number
  toolCallUsagePercent: number
  driveTrafficUsage: number
  driveTrafficUsagePercent: number
  aiTokenGeneralUsage: number
  aiTokenGeneralUsagePercent: number
  totalCreditUsage: number
}

export interface ITeamSubscription {
  credit: {
    current: ICreditInfo
  }
}

// new data types
export interface IUserInfoDTO {
  id: string
  nickname: string
  avatarUrl: string
  language: string
  personalization: Record<string, unknown>

  // temp
  email: string
}

// {
//   "id": "string",
//   "avatarUrl": "string",
//   "identify": "string",
//   "name": "string",
//   "createdAt": "string"
// }
export interface ITeamInfoDTO {
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
