import { USER_ROLE } from "@illa-public/public-types"

export interface INewInviteLinkProps {
  redirectURL: string
  onCopyInviteLink: (inviteLink: string) => void
  excludeUserRole?: USER_ROLE[]
}
