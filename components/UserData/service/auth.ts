import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net"
import {
  BaseUserInfo,
  CurrentUserInfo,
  MemberInfo,
  TeamInfo,
  USER_ROLE,
} from "@illa-public/public-types"
import { getAuthToken } from "@illa-public/utils"
import { OAUTH_REDIRECT_URL } from "../constants"
import {
  ICreditUsageInfoResponse,
  IForgetPasswordRequestBody,
  ISignInRequestData,
  ITeamSubscription,
  IUpdateTeamPermissionConfigRequest,
} from "./interface"

export const authAPI = createApi({
  reducerPath: "authAPI",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}/supervisor/api/v1/`,
    prepareHeaders: (headers) => {
      const urlParams = new URLSearchParams(location.search)
      const token = urlParams.get("token") || getAuthToken()
      if (token) {
        headers.set("Authorization", token)
      }
      return headers
    },
  }),
  tagTypes: ["members"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<CurrentUserInfo, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUserInfoAndTeamsInfoByToken: builder.query<
      {
        user: CurrentUserInfo
        teams: TeamInfo[]
        currentTeamID: string | undefined
      },
      {
        teamIdentifier?: string
        strictMode?: boolean
      }
    >({
      async queryFn(
        { teamIdentifier, strictMode },
        _queryAPI,
        _extraOptions,
        fetchWithBQ,
      ) {
        const userInfoResult = await fetchWithBQ("users")
        if (userInfoResult.error) {
          return {
            error: userInfoResult.error,
          }
        }
        const userInfo = userInfoResult.data as CurrentUserInfo
        const teamInfoResult = await fetchWithBQ("teams/my")
        if (teamInfoResult.error) {
          return {
            error: teamInfoResult.error,
          }
        }
        const teamInfos = (teamInfoResult.data || []) as TeamInfo[]
        let currentTeamID
        if (strictMode) {
          currentTeamID = teamInfos.find(
            (info) => info.identifier === teamIdentifier,
          )?.id
        } else {
          if (teamInfos.length > 0) {
            currentTeamID = teamInfos[0].id
          }
        }
        return {
          data: {
            user: userInfo,
            teams: teamInfos,
            currentTeamID,
          },
        }
      },
    }),

    signIn: builder.mutation<
      {
        token?: string | null
      },
      {
        email: string
        password: string
      }
    >({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (_, meta) => {
        return {
          token: meta?.response?.headers.get("tipisai-token"),
        }
      },
    }),

    getOAuthURI: builder.query<
      {
        uri: string
      },
      {
        oauthAgency: "github" | "google"
        landing: "signin" | "signup" | "connect"
        redirectURI?: string
      }
    >({
      query: ({ oauthAgency, redirectURI, landing }) =>
        `/oauth/${oauthAgency}/uri/redirectTo/${encodeURIComponent(
          redirectURI ?? OAUTH_REDIRECT_URL,
        )}/landing/${landing}`,
    }),

    signUp: builder.mutation<
      CurrentUserInfo & { token?: string | null },
      ISignInRequestData
    >({
      query: (data) => ({
        method: "POST",
        url: "/auth/signup",
        body: data,
      }),
      transformResponse: (res: { data: CurrentUserInfo }, meta) => {
        return {
          ...res?.data,
          token: meta?.response?.headers.get("tipisai-token"),
        }
      },
    }),

    sendVerificationCodeToEmail: builder.mutation<
      {
        verificationToken: string
      },
      {
        email: string
        usage: "signup" | "forgetpwd"
      }
    >({
      query: ({ email, usage }) => ({
        method: "POST",
        url: "/auth/verification",
        body: {
          email,
          usage,
        },
      }),
    }),

    changeTeamConfig: builder.mutation<
      | undefined
      | {
          teams?: TeamInfo[]
        },
      {
        teamID: string
        data: {
          name?: string
          identifier?: string
          icon?: string
        }
      }
    >({
      async queryFn({ teamID, data }, _queryAPI, _extraOptions, fetchWithBQ) {
        const updateResult = await fetchWithBQ({
          method: "PATCH",
          url: `/teams/${teamID}/config`,
          body: data,
        })
        if (updateResult.error) {
          return {
            error: updateResult.error,
          }
        }

        if (data.identifier) {
          const teamInfoResult = await fetchWithBQ("teams/my")
          if (teamInfoResult.error) {
            return {
              error: teamInfoResult.error,
            }
          }
          const teamInfos = teamInfoResult.data as TeamInfo[]
          return {
            data: {
              teams: teamInfos,
            },
          }
        }
        return {
          data: undefined,
        }
      },
    }),

    forgetPassword: builder.mutation<undefined, IForgetPasswordRequestBody>({
      query: (data) => ({
        method: "POST",
        url: "/auth/forgetPassword",
        body: data,
      }),
    }),

    exchangeToken: builder.mutation<
      BaseUserInfo & { token?: string | null },
      {
        oauthAgency: "github" | "google"
        code: string
        state: string
      }
    >({
      query: ({ oauthAgency, code, state }) => ({
        url: `/oauth/${oauthAgency}/exchange`,
        method: "POST",
        body: {
          code,
          state,
        },
      }),
      transformResponse: (res: { data: BaseUserInfo }, meta) => {
        return {
          ...res?.data,
          token: meta?.response?.headers.get("tipisai-token"),
        }
      },
    }),

    getPortalURL: builder.query<
      {
        url: string
      },
      {
        teamID: string
        returningURL: string
      }
    >({
      query: ({ teamID, returningURL }) => ({
        url: `/teams/${teamID}/billing/getPortalURL`,
        method: "POST",
        body: { returningURL },
      }),
    }),

    getCreditUsageInfo: builder.query<
      ICreditUsageInfoResponse,
      {
        teamID: string
        fromDate: string
        toDate: string
      }
    >({
      query: ({ teamID, fromDate, toDate }) => ({
        url: `/teams/${teamID}/billing/collaUsageInfo?fromDate=${encodeURI(
          fromDate,
        )}&toDate=${encodeURI(toDate)}`,
        method: "GET",
      }),
    }),

    getTeamSubscription: builder.query<ITeamSubscription, string>({
      query: (teamID) => ({
        url: `/teams/${teamID}/billing`,
        method: "GET",
      }),
    }),

    getTeamsInfo: builder.query<TeamInfo[], {}>({
      query: () => ({
        url: "/teams/my",
        method: "GET",
      }),
    }),

    joinTeam: builder.mutation<TeamInfo, string>({
      query: (inviteToken) => ({
        url: `/join/${inviteToken}`,
        method: "PUT",
      }),
    }),

    deleteTeamByID: builder.mutation<undefined, string>({
      query: (teamID) => ({
        method: "DELETE",
        url: `/teams/${teamID}`,
      }),
      async onQueryStarted(teamID, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authAPI.util.updateQueryData(
            "getUserInfoAndTeamsInfoByToken",
            {},
            (draft) => {
              const currentTeams =
                draft.teams?.filter((teamInfo) => teamInfo.id !== teamID) || []

              draft.teams = currentTeams
              draft.currentTeamID = currentTeams[0].id
            },
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    removeTeamMemberByID: builder.mutation<
      undefined,
      {
        teamID: string
        teamMemberID: string
      }
    >({
      query: ({ teamID, teamMemberID }) => ({
        method: "DELETE",
        url: `/teams/${teamID}/teamMembers/${teamMemberID}`,
      }),
      invalidatesTags: ["members"],
    }),

    changeTeamMemberRole: builder.mutation<
      undefined,
      {
        teamID: string
        teamMemberID: string
        userRole: USER_ROLE
      }
    >({
      query: ({ teamID, teamMemberID, userRole }) => ({
        method: "PATCH",
        url: `/teams/${teamID}/teamMembers/${teamMemberID}/role`,
        body: {
          userRole,
        },
      }),
      invalidatesTags: ["members"],
    }),

    updateTeamPermissionConfig: builder.mutation<
      undefined,
      {
        teamID: string
        data: IUpdateTeamPermissionConfigRequest
      }
    >({
      query: ({ teamID, data }) => ({
        method: "PATCH",
        url: `/teams/${teamID}/permission`,
        body: data,
      }),
    }),

    getTeamIconUploadAddress: builder.query<
      {
        uploadAddress: string
      },
      {
        fileName: string
        teamID: string
        type: string
      }
    >({
      query: ({ teamID, type, fileName }) => {
        return {
          url: `/teams/${teamID}icon/uploadAddress/fileName/${fileName}.${type}`,
          method: "GET",
        }
      },
    }),

    updateUserLanguage: builder.mutation<undefined, string>({
      query: (language) => ({
        url: "/users/language",
        method: "PATCH",
        body: {
          language,
        },
      }),
    }),

    cancelLinked: builder.mutation<undefined, "github" | "google">({
      query: (oauthAgency) => ({
        url: `/users/oauth/${oauthAgency}`,
        method: "DELETE",
      }),
    }),

    updateUserPassword: builder.mutation<
      undefined,
      {
        currentPassword: string
        newPassword: string
      }
    >({
      query: (data) => ({
        url: "/users/password",
        method: "PATCH",
        data,
      }),
    }),

    updateNickName: builder.mutation<undefined, string>({
      query: (nickname) => ({
        url: "/users/nickname",
        method: "PATCH",
        body: {
          nickname,
        },
      }),
    }),

    updateUserAvatar: builder.mutation<undefined, string>({
      query: (avatar) => ({
        url: "/users/avatar",
        method: "PATCH",
        body: {
          avatar,
        },
      }),
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

    logout: builder.mutation<undefined, string>({
      query: (token) => ({
        method: "POST",
        url: "/users/logout",
        headers: {
          Authorization: token,
        },
      }),
    }),

    getMemberList: builder.query<MemberInfo[], string>({
      query: (teamID) => {
        return {
          url: `/teams/${teamID}/members`,
          method: "GET",
        }
      },
      providesTags: ["members"],
    }),

    createTeam: builder.mutation<
      {
        teams: TeamInfo[]
        currentTeamID?: string
      },
      {
        name: string
        identifier: string
      }
    >({
      async queryFn(
        { name, identifier },
        _queryAPI,
        _extraOptions,
        fetchWithBQ,
      ) {
        const createResult = await fetchWithBQ({
          url: "/teams",
          method: "POST",
          body: {
            name,
            identifier,
          },
        })
        if (createResult.error) {
          return {
            error: createResult.error,
          }
        }
        const teamInfoResult = await fetchWithBQ("teams/my")
        if (teamInfoResult.error) {
          return {
            error: teamInfoResult.error,
          }
        }
        const teamInfos = teamInfoResult.data as TeamInfo[]
        const currentTeamID = teamInfos.find(
          (info) => info.identifier === identifier,
        )?.id
        return {
          data: {
            teams: teamInfos,
            currentTeamID,
          },
        }
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            authAPI.util.updateQueryData(
              "getUserInfoAndTeamsInfoByToken",
              {},
              (draft) => {
                draft.teams = data.teams
                draft.currentTeamID = data.currentTeamID
              },
            ),
          )
        } catch {}
      },
    }),
  }),
})

export const {
  useGetUserInfoAndTeamsInfoByTokenQuery,
  useSignInMutation,
  useLazyGetOAuthURIQuery,
  useSignUpMutation,
  useSendVerificationCodeToEmailMutation,
  useForgetPasswordMutation,
  useExchangeTokenMutation,
  useChangeTeamConfigMutation,
  useLazyGetPortalURLQuery,
  useLazyGetCreditUsageInfoQuery,
  useLazyGetTeamSubscriptionQuery,
  useGetTeamSubscriptionQuery,
  useLazyGetTeamsInfoQuery,
  useDeleteTeamByIDMutation,
  useRemoveTeamMemberByIDMutation,
  useLazyGetTeamIconUploadAddressQuery,
  useUpdateUserLanguageMutation,
  useCancelLinkedMutation,
  useUpdateUserPasswordMutation,
  useUpdateNickNameMutation,
  useLazyGetUserAvatarUploadAddressQuery,
  useUpdateUserAvatarMutation,
  useLogoutMutation,
  useChangeTeamMemberRoleMutation,
  useUpdateTeamPermissionConfigMutation,
  useGetMemberListQuery,
  useCreateTeamMutation,
} = authAPI
