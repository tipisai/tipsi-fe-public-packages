import { createSelector } from "@reduxjs/toolkit"
import { ITeamInfoVO, SUBSCRIBE_PLAN } from "@illa-public/public-types"
import { RootState } from "../store"

export const getCurrentId = (state: RootState) => {
  return state.team.currentId
}
export const getTeamItems = (state: RootState) => state.team.items
export const getCurrentMemberList = (state: RootState) =>
  state.team.currentMemberList

export const getIsEmptyTeam = createSelector([getTeamItems], (teams) => {
  return !Array.isArray(teams) || teams.length === 0
})

export const getCurrentTeamInfo = createSelector(
  [getCurrentId, getTeamItems],
  (currentId, items) => {
    if (!currentId || !items) return
    return items.find((item) => item.id === currentId)
  },
)

export const getPlanUtils = (teamInfo?: ITeamInfoVO): SUBSCRIBE_PLAN => {
  if (!teamInfo) return SUBSCRIBE_PLAN.UNDEFINED
  return teamInfo.credit.plan
}
