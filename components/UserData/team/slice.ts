import { createSlice } from "@reduxjs/toolkit"
import { authAPI, teamAPI } from ".."
import {
  addTeamItemReducer,
  deleteMemberListReducer,
  deleteTeamInfoReducer,
  updateCurrentIdReducer,
  updateCurrentMemberListReducer,
  updateCurrentRoleReducer,
  updateCurrentTeamInfoReducer,
  updateCurrentTeamLicenseByTeamIDReducer,
  updateCurrentTeamLicenseReducer,
  updateCurrentTeamPersonalConfigReducer,
  updateInvitedUserReducer,
  updateMemberListReducer,
  updateTargetTeamInfoCustomInfoReducer,
  updateTeamItemsReducer,
  updateTeamMemberPermissionReducer,
  updateTeamMemberSubscribeReducer,
  updateTeamMemberUserRoleReducer,
  updateTeamReducer,
  updateTransUserRoleReducer,
} from "./reducer"
import { teamInitialState } from "./state"

const teamSlice = createSlice({
  name: "team",
  initialState: teamInitialState,
  reducers: {
    updateTeamReducer,
    updateCurrentIdReducer,
    updateTeamItemsReducer,
    updateCurrentRoleReducer,
    updateMemberListReducer,
    updateTransUserRoleReducer,
    updateTeamMemberUserRoleReducer,
    updateTeamMemberPermissionReducer,
    updateTeamMemberSubscribeReducer,
    updateCurrentTeamLicenseReducer,
    updateCurrentTeamPersonalConfigReducer,
    addTeamItemReducer,
    updateCurrentMemberListReducer,
    deleteMemberListReducer,
    updateInvitedUserReducer,
    deleteTeamInfoReducer,
    updateCurrentTeamLicenseByTeamIDReducer,
    updateCurrentTeamInfoReducer,
    updateTargetTeamInfoCustomInfoReducer,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      teamAPI.endpoints.getTeamsInfoAndCurrentID.matchFulfilled,
      (state, action) => {
        state.items = action.payload.teams
        state.currentId = action.payload.currentTeamID
      },
    )

    builder.addMatcher(
      teamAPI.endpoints.getTeamsInfo.matchFulfilled,
      (state, action) => {
        state.items = action.payload
      },
    )

    builder.addMatcher(
      authAPI.endpoints.updateTeamPermissionConfig.matchFulfilled,
      (state, action) => {
        const { data, teamID } = action.meta.arg.originalArgs
        const teams = state.items || []
        const index = teams.findIndex((team) => team.id === teamID)
        const targetTeam = teams[index]
        const items = teams.splice(index, 1, {
          ...targetTeam,
          permission: {
            ...targetTeam.permission,
            ...data,
          },
        })
        state.items = items
      },
    )

    builder.addMatcher(
      teamAPI.endpoints.changeTeamConfig.matchFulfilled,
      (state, action) => {
        state.items = [...(state.items ?? []), action.payload]
      },
    )
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
