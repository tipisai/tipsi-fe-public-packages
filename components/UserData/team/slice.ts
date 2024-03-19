import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from ".."
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
      authAPI.endpoints.getUserInfoAndTeamsInfoByToken.matchFulfilled,
      (state, action) => {
        state.items = action.payload.teams
        state.currentId = action.payload.currentTeamID
      },
    )

    builder.addMatcher(
      authAPI.endpoints.deleteTeamByID.matchFulfilled,
      (state, action) => {
        const teamID = action.meta.arg.originalArgs

        const currentTeams =
          state.items?.filter((item) => item.id !== teamID) || []

        state.currentId =
          currentTeams.length === 0 ? undefined : currentTeams[0].id
        state.items = currentTeams
      },
    )

    builder.addMatcher(
      authAPI.endpoints.getTeamsInfo.matchFulfilled,
      (state, action) => {
        state.items = action.payload
      },
    )

    builder.addMatcher(
      authAPI.endpoints.createTeam.matchFulfilled,
      (state, action) => {
        const { teams, currentTeamID } = action.payload
        state.items = teams
        state.currentId = currentTeamID
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
      authAPI.endpoints.changeTeamConfig.matchFulfilled,
      (state, action) => {
        state.items = action.payload?.teams ?? state.items
      },
    )
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
