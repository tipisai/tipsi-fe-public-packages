import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net"
import { CurrentUserInfo } from "@illa-public/public-types"
import { prepareHeaders } from "./prepareHeaders"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}`,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<CurrentUserInfo, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetUserInfoQuery } = userAPI
