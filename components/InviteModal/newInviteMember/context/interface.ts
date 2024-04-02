import { ReactNode } from "react"
import { USER_ROLE } from "@illa-public/public-types"

export interface IInviteMemberInject {
  defaultAllowInviteLink: boolean
  defaultInviteUserRole: USER_ROLE
  teamID: string
  currentUserRole: USER_ROLE
}

export interface IInviteMemberProviderProps
  extends Partial<IInviteMemberInject> {
  teamID: string
  children: ReactNode
}
