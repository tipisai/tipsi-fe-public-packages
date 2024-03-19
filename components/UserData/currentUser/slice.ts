import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../service/auth"
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
      authAPI.endpoints.getUserInfoAndTeamsInfoByToken.matchFulfilled,
      (state, action) => {
        state = action.payload.user
        return state
      },
    ),
      builder.addMatcher(
        authAPI.endpoints.updateNickName.matchFulfilled,
        (state, action) => {
          return {
            ...state,
            nickname: action.meta.arg.originalArgs,
          }
        },
      )

    builder.addMatcher(
      authAPI.endpoints.updateUserAvatar.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          avatar: action.meta.arg.originalArgs,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.updateUserLanguage.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          language: action.meta.arg.originalArgs,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.cancelLinked.matchFulfilled,
      (state, action) => {
        const type = action.meta.arg.originalArgs
        const ssoVerified = {
          google: state?.ssoVerified?.google ?? false,
          github: state?.ssoVerified?.github ?? false,
        }
        if (type === "github") {
          ssoVerified.github = false
        } else {
          ssoVerified.google = false
        }
        return {
          ...state,
          ssoVerified,
        }
      },
    )

    builder.addMatcher(
      authAPI.endpoints.forgetPassword.matchFulfilled,
      (state, action) => {
        if (action.meta.arg.originalArgs.isFirstSet) {
          return {
            ...state,
            isPasswordSet: true,
          }
        }
      },
    )
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
