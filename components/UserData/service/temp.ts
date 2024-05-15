import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tempAPI = createApi({
  reducerPath: "tempAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://cloud-api-test.tipis.ai/supervisor/api/v1`,
  }),
  endpoints: (builder) => ({
    // TEMP
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
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo0LCJ1dWlkIjoiODVlY2Y0NmEtYWZhMy00MWRjLTg5YjMtMjM1MDE3YzUwNTJjIiwicm5kIjoiMDAwMjQyIiwiaXNzIjoiVElQSVNBSSIsImV4cCI6MTcxNjE5Nzg1Mn0.7Pa7dX8CYSYQyO3C0VUOmLRSRy20gmeu-T_UOzqBuFc`,
          },
        }
      },
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
          url: `/teams/ILAfx4p1C7dW/icon/uploadAddress/fileName/${fileName}.${type}`,
          method: "GET",
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo0LCJ1dWlkIjoiODVlY2Y0NmEtYWZhMy00MWRjLTg5YjMtMjM1MDE3YzUwNTJjIiwicm5kIjoiMDAwMjQyIiwiaXNzIjoiVElQSVNBSSIsImV4cCI6MTcxNjE5Nzg1Mn0.7Pa7dX8CYSYQyO3C0VUOmLRSRy20gmeu-T_UOzqBuFc`,
          },
        }
      },
    }),
  }),
})

export const {
  useLazyGetUserAvatarUploadAddressQuery,
  useLazyGetTeamIconUploadAddressQuery,
} = tempAPI
