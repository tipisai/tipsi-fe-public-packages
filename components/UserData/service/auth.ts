import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net"
import {
  BaseUserInfo,
  CurrentUserInfo,
  TeamInfo,
} from "@illa-public/public-types"
import { OAUTH_REDIRECT_URL } from "../constants"
import {
  ICreditUsageInfoResponse,
  IForgetPasswordRequestBody,
  ISignInRequestData,
  ITeamSubscription,
} from "./interface"
import { prepareHeaders } from "./prepareHeaders"

export const authAPI = createApi({
  reducerPath: "authAPI",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}/supervisor/api/v1/`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["members"],
  endpoints: (builder) => ({
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
        url: `/teams/${teamID}/billing/creditUsageInfo?fromDate=${encodeURI(
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

    joinTeam: builder.mutation<TeamInfo, string>({
      query: (inviteToken) => ({
        url: `/join/${inviteToken}`,
        method: "PUT",
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
  }),
})

export const {
  useSignInMutation,
  useLazyGetOAuthURIQuery,
  useSignUpMutation,
  useSendVerificationCodeToEmailMutation,
  useForgetPasswordMutation,
  useExchangeTokenMutation,
  useLazyGetPortalURLQuery,
  useLazyGetCreditUsageInfoQuery,
  useLazyGetTeamSubscriptionQuery,
  useGetTeamSubscriptionQuery,
  useLazyGetTeamIconUploadAddressQuery,
  useUpdateUserPasswordMutation,
  useLazyGetUserAvatarUploadAddressQuery,
  useLogoutMutation,
} = authAPI
