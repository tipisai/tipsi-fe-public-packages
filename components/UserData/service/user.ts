import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CurrentUserInfo } from "@illa-public/public-types"
import { prepareHeaders } from "./prepareHeaders"

const HTTP_REQUEST_PUBLIC_BASE_URL = "http://192.168.50.195:3000"
const CLOUD_REQUEST_PREFIX = "/v1/user"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<CurrentUserInfo, null>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserLanguage: builder.mutation<undefined, string>({
      query: (language) => ({
        url: "/users/language",
        method: "PATCH",
        body: {
          language,
        },
      }),
      onQueryStarted: async (language, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getUserInfo", null, (draft) => {
            draft = {
              ...draft,
              language,
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

    updateUserAvatar: builder.mutation<undefined, string>({
      query: (avatar) => ({
        url: "/users/avatar",
        method: "PATCH",
        body: {
          avatar,
        },
      }),
      onQueryStarted: async (avatar, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getUserInfo", null, (draft) => {
            draft = {
              ...draft,
              avatar,
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

    updateNickName: builder.mutation<undefined, string>({
      query: (nickname) => ({
        url: "/users/nickname",
        method: "PATCH",
        body: {
          nickname,
        },
      }),
      onQueryStarted: async (nickname, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userAPI.util.updateQueryData("getUserInfo", null, (draft) => {
            draft = {
              ...draft,
              nickname,
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

    getUserAvatarUploadAddress: builder.query<
      {
        uploadAddress: string
      },
      {
        fileName: string
        type: string
      }
    >({
      query: ({ type, fileName }) => {
        return {
          url: `/users/avatar/uploadAddress/fileName/${fileName}.${type}`,
          method: "GET",
        }
      },
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  useUpdateUserLanguageMutation,
  useUpdateUserAvatarMutation,
  useUpdateNickNameMutation,
  useSetPersonalizationMutation,
  useLazyGetUserAvatarUploadAddressQuery,
} = userAPI
