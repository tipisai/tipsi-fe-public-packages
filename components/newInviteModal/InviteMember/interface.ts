export interface NewInviteMemberProps {
  redirectURL: string
  onCopyInviteLink: (inviteLink: string) => void
  onClose: () => void
  titleName?: string
}
