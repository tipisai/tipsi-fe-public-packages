import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net"
import {
  BaseUserInfo,
  CurrentUserInfo,
  TeamInfo,
} from "@illa-public/public-types"
import { getAuthToken } from "@illa-public/utils"
import { OAUTH_REDIRECT_URL } from "../constants"
import { IForgetPasswordRequestBody, ISignInRequestData } from "./interface"

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
  endpoints: (builder) => ({
    getUserInfoAndTeamsInfoByToken: builder.query<
      {
        user: CurrentUserInfo
        teams: TeamInfo[]
        currentTeamID: string | undefined
      },
      string | undefined
    >({
      async queryFn(teamIdentifier, _queryAPI, _extraOptions, fetchWithBQ) {
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
        const teamInfos = teamInfoResult.data as TeamInfo[]
        const currentTeamID = teamInfos.find(
          (info) => info.identifier === teamIdentifier,
        )?.id
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
          token: meta?.response?.headers.get("illa-token"),
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
      query: (...data) => ({
        method: "POST",
        url: "/auth/signup",
        body: {
          ...data,
        },
      }),
      transformResponse: (res: { data: CurrentUserInfo }, meta) => {
        return {
          ...res?.data,
          token: meta?.response?.headers.get("illa-token"),
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
          token: meta?.response?.headers.get("illa-token"),
        }
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
} = authAPI
