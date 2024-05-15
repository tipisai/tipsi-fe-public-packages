import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUserInfoDTO } from "./interface"
import { prepareHeaders } from "./prepareHeaders"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.ILLA_V2_API_URL_ORIGIN}/v1`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserInfoDTO, null>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation<
      IUserInfoDTO,
      Partial<{
        nickname: string
        avatarUrl: string
        language: string
      }>
    >({
      query: (body) => ({
        url: "/user",
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (updateBody, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getUserInfo", null, (draft) => {
            draft = {
              ...draft,
              ...updateBody,
            }
            return draft
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["User"],
    }),

    setPersonalization: builder.mutation<void, Record<string, unknown>>({
      query: (data) => ({
        method: "PUT",
        url: "/users/personalization",
        body: data,
      }),
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getUserInfo", null, (draft) => {
            draft = {
              ...draft,
              personalization: data,
            }
            return draft
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useUpdateUserProfileMutation,
  useSetPersonalizationMutation,
} = userAPI
