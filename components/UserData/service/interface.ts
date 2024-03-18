import { CollarInfo } from "@illa-public/public-types"

export interface ISignInRequestData {
  nickname: string
  email: string
  verificationToken: string
  password: string
  isSubscribed: boolean
  inviteToken?: string | null
  language: string
}

export interface IForgetPasswordRequestBody {
  email: string
  verificationToken: string
  verificationCode: string
  newPassword: string
  isFirstSet?: boolean
}

export interface IWooUsageInfoResponse {
  driveVolumeUsage: number
  driveVolumeUsagePercent: number
  driveTrafficUsage: number
  driveTrafficUsagePercent: number
  aiTokenGeneralUsage: number
  aiTokenGeneralUsagePercent: number
  totalCollaUsage: number
}

export interface ITeamSubscription {
  colla: {
    current: CollarInfo
  }
}

export interface IUpdateTeamPermissionConfigRequest {
  allowEditorManageTeamMember?: boolean
  allowViewerManageTeamMember?: boolean
  blockRegister?: boolean
}
