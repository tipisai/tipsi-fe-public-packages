import { createSlice } from "@reduxjs/toolkit"
import { userAPI } from ".."
import {
  updateCurrentUserReducer,
  updateUserAvatarReducer,
  updateUserInfoReducer,
  updateUserIsTutorialViewedReducer,
} from "./reducer"
import { CurrentUserInitialState } from "./state"

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: CurrentUserInitialState,
  reducers: {
    updateCurrentUserReducer,
    updateUserAvatarReducer,
    updateUserIsTutorialViewedReducer,
    updateUserInfoReducer,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userAPI.endpoints.getUserInfo.matchFulfilled,
      (state, action) => {
        state = action.payload
        return state
      },
    )
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
