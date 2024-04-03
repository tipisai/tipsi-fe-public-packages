import { FC, createContext } from "react"
import { USER_ROLE } from "@illa-public/public-types"
import { IInviteMemberInject, IInviteMemberProviderProps } from "./interface"

export const InviteMemberContext = createContext<IInviteMemberInject>({
  defaultAllowInviteLink: false,
  defaultInviteUserRole: USER_ROLE.VIEWER,
  teamID: "",
  currentUserRole: USER_ROLE.VIEWER,
})

export const InviteMemberProvider: FC<IInviteMemberProviderProps> = (props) => {
  const {
    defaultAllowInviteLink = false,
    defaultInviteUserRole = USER_ROLE.VIEWER,
    teamID,
    currentUserRole = USER_ROLE.VIEWER,
    children,
  } = props
  return (
    <InviteMemberContext.Provider
      value={{
        defaultAllowInviteLink,
        defaultInviteUserRole,
        teamID,
        currentUserRole,
      }}
    >
      {children}
    </InviteMemberContext.Provider>
  )
}
