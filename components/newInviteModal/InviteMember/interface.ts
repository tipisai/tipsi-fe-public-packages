import { USER_ROLE } from "@illa-public/public-types"

export interface NewInviteMemberProps {
  excludeUserRole?: USER_ROLE[]
  redirectURL: string
  onCopyInviteLink: (inviteLink: string) => void
  onClose: () => void
  titleName?: string
}
