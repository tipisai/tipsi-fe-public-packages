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
  newPassword: string
}
