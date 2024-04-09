import { createSlice } from "@reduxjs/toolkit"
import { teamAPI } from ".."
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
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
