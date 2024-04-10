import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net"
import {
  BaseUserInfo,
  CurrentUserInfo,
  TeamInfo,
} from "@illa-public/public-types"
import { IForgetPasswordRequestBody, ISignInRequestData } from "./interface"
import { prepareHeaders } from "./prepareHeaders"

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}`,
    prepareHeaders: prepareHeaders,
  }),
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
        redirectURI: string
      }
    >({
      query: ({ oauthAgency, redirectURI, landing }) =>
        `/oauth/${oauthAgency}/uri/redirectTo/${encodeURIComponent(
          redirectURI,
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
          url: `/teams/${teamID}/icon/uploadAddress/fileName/${fileName}.${type}`,
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
        body: data,
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
  useLazyGetTeamIconUploadAddressQuery,
  useUpdateUserPasswordMutation,
  useLazyGetUserAvatarUploadAddressQuery,
  useLogoutMutation,
} = authAPI
