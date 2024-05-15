import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ITeamStateDataVO } from "./state"

export const updateCurrentIdReducer: CaseReducer<
  ITeamStateDataVO,
  PayloadAction<string>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    currentId: payload,
  }
  return state
}
