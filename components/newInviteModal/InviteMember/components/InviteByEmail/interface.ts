import { USER_ROLE } from "@illa-public/public-types"

export interface InviteByEmailProps {
  redirectURL: string
  excludeUserRole?: USER_ROLE[]
}

export interface InvitedUser {
  email: string
  teamMemberID: string
  userRole: USER_ROLE
}
