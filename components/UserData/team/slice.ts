import { createSlice } from "@reduxjs/toolkit"
import { teamAPI } from ".."
import { updateCurrentIdReducer } from "./reducer"
import { teamInitialState } from "./state"

const teamSlice = createSlice({
  name: "team",
  initialState: teamInitialState,
  reducers: {
    updateCurrentIdReducer,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      teamAPI.endpoints.getTeamsInfoAndCurrentID.matchFulfilled,
      (state, action) => {
        state.items = action.payload.teams
        state.currentId = action.payload.currentTeamID!
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
