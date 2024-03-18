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

        return {
          ...state,
          currentId: currentTeams.length === 0 ? undefined : currentTeams[0].id,
          items: currentTeams,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.getTeamsInfo.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          items: action.payload,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.createTeam.matchFulfilled,
      (state, action) => {
        const { teams, currentTeamID } = action.payload
        return {
          ...state,
          items: teams,
          currentId: currentTeamID,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.updateTeamPermissionConfig.matchFulfilled,
      (state, action) => {
        const value = action.meta.arg.originalArgs
        const newPermission = {
          allowEditorManageTeamMember: value,
          allowViewerManageTeamMember: value,
        }
        return {
          ...state,
          newPermission,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.changeTeamConfig.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          ...action.meta.arg.originalArgs.data,
        }
      },
    )
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
