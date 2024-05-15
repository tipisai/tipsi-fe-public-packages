import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MemberInfo, USER_ROLE } from "@illa-public/public-types"
import {
  ICreditUsageInfoResponse,
  ITeamInfoDTO,
  ITeamSubscription,
} from "./interface"
import { prepareHeaders } from "./prepareHeaders"

export const teamAPI = createApi({
  reducerPath: "teamAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.ILLA_V2_API_URL_ORIGIN}/v1`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["CurrentTeam", "Teams", "TeamMembers"],
  endpoints: (builder) => ({
    getTeamInfoByID: builder.query<ITeamInfoDTO, string>({
      query: (id) => `/teams/${id}`,
      providesTags: ["CurrentTeam"],
    }),

    getTeamsInfo: builder.query<ITeamInfoDTO[], null>({
      query: () => "/teams",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Teams" as const, id })),
              "Teams",
            ]
          : ["Teams"],
    }),

    getTeamsInfoAndCurrentID: builder.query<
      {
        teams: ITeamInfoDTO[]
        currentTeamID?: string
        currentTeamInfo?: ITeamInfoDTO
      },
      string | undefined
    >({
      async queryFn(teamIdentifier, _queryAPI, _extraOptions, fetchWithBQ) {
        const teamInfoResult = await fetchWithBQ("/teams")
        if (teamInfoResult.error) {
          return {
            error: teamInfoResult.error,
          }
        }
        const teamInfos = teamInfoResult.data as ITeamInfoDTO[]

        if (!teamIdentifier) {
          return {
            data: {
              teams: teamInfos,
            },
          }
        }
        const currentTeam = teamInfos.find(
          (info) => info.identify === teamIdentifier,
        )
        return {
          data: {
            teams: teamInfos,
            currentTeamID: currentTeam?.id,
          },
        }
      },
      async onQueryStarted(teamIdentifier, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

        dispatch(teamAPI.util.upsertQueryData("getTeamsInfo", null, data.teams))
      },

      providesTags: (result) =>
        Array.isArray(result?.teams)
          ? [
              ...result.teams.map(({ id }) => ({ type: "Teams" as const, id })),
              "Teams",
            ]
          : ["Teams"],
    }),

    deleteTeamByID: builder.mutation<undefined, string>({
      query: (teamID) => ({
        method: "DELETE",
        url: `/teams/${teamID}`,
      }),
      async onQueryStarted(teamID, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          teamAPI.util.updateQueryData(
            "getTeamsInfo",
            null,
            (draft) => {
              const currentTeams =
                draft.filter((teamInfo) => teamInfo.id !== teamID) || []
              draft = [...currentTeams]

              return draft
            },
            true,
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Teams"],
    }),

    updateTeamInfo: builder.mutation<
      ITeamInfoDTO,
      {
        teamID: string
        data: {
          name?: string
          identify?: string
          avatarUrl?: string
        }
      }
    >({
      query: ({ teamID, data }) => ({
        url: `/teams/${teamID}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (
        { teamID, data },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          teamAPI.util.updateQueryData("getTeamsInfo", null, (draft) => {
            draft = draft.map((team) => {
              if (team.id === teamID) {
                return {
                  ...team,
                  ...data,
                }
              }
              return team
            })
            return draft
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Teams"],
    }),

    createTeam: builder.mutation<
      ITeamInfoDTO,
      {
        name: string
        identify: string
      }
    >({
      query: ({ name, identify }) => ({
        url: "/teams",
        method: "POST",
        body: {
          name,
          identify,
        },
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            teamAPI.util.updateQueryData(
              "getTeamsInfo",
              null,
              (draft) => {
                draft = [...(draft || []), data]
                return draft
              },
              true,
            ),
          )
        } catch {}
      },
      invalidatesTags: ["Teams"],
    }),

    joinTeam: builder.mutation<ITeamInfoDTO, string>({
      query: (inviteToken) => ({
        url: `/join/${inviteToken}`,
        method: "PUT",
      }),
      onQueryStarted: async (inviteToken, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(
            teamAPI.util.updateQueryData("getTeamsInfo", null, (draft) => {
              draft = [...(draft || []), data]
              return draft
            }),
          )
        } catch {}
      },
      invalidatesTags: ["Teams"],
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
      async onQueryStarted(
        { teamID, teamMemberID },
        { dispatch, queryFulfilled },
      ) {
        const teamsInfoPathResult = dispatch(
          teamAPI.util.updateQueryData("getTeamsInfo", null, (draft) => {
            const targetTeamInfo = draft.find((team) => team.id === teamID)
            if (!targetTeamInfo) return draft
            if (targetTeamInfo.teamMemberID === teamMemberID) {
              const newTeams = draft.filter((team) => team.id !== teamID)
              draft = [...newTeams]
            }
            return draft
          }),
        )
        const teamMemberPathResult = dispatch(
          teamAPI.util.updateQueryData("getMemberList", teamID, (draft) => {
            const newMembers = draft.filter(
              (member) => member.teamMemberID !== teamMemberID,
            )
            draft = [...newMembers]
            return draft
          }),
        )
        try {
          await queryFulfilled
        } catch {
          teamsInfoPathResult.undo()
          teamMemberPathResult.undo()
        }
      },
      invalidatesTags: ["Teams", "TeamMembers"],
    }),

    getMemberList: builder.query<MemberInfo[], string>({
      query: (teamID) => {
        return {
          url: `/teams/${teamID}/members`,
          method: "GET",
        }
      },
      providesTags: ["TeamMembers"],
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
      onQueryStarted: async (
        { teamID, teamMemberID, userRole },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          teamAPI.util.updateQueryData("getMemberList", teamID, (draft) => {
            draft.forEach((member) => {
              if (member.teamMemberID === teamMemberID) {
                member.userRole = userRole
              }
            })
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["TeamMembers"],
    }),

    getInviteLink: builder.query<
      { inviteLink: string },
      {
        teamID: string
        userRole: USER_ROLE
        redirectURL: string
      }
    >({
      query: ({ teamID, userRole, redirectURL }) => ({
        url: `/teams/${teamID}/inviteLink/userRole/${userRole}${redirectURL ? `?redirectURL=${encodeURIComponent(redirectURL)}` : ""}`,
        method: "GET",
      }),
    }),

    changeTeamInviteLinkEnabled: builder.mutation<
      null,
      {
        teamID: string
        inviteLinkEnabled: boolean
      }
    >({
      query: ({ teamID, inviteLinkEnabled }) => ({
        url: `/teams/${teamID}/configInviteLink`,
        method: "PATCH",
        body: {
          inviteLinkEnabled,
        },
      }),
      onQueryStarted: async (
        { teamID, inviteLinkEnabled },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          teamAPI.util.updateQueryData("getTeamsInfo", null, (draft) => {
            draft = draft.map((team) => {
              if (team.id === teamID) {
                return {
                  ...team,
                  inviteLinkEnabled,
                }
              }
              return team
            })
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

    inviteByEmail: builder.mutation<
      {
        aiAgentID: string
        appID: string
        email: string
        emailStatus: boolean
        feedback: string
        teamMemberID: string
        userRole: USER_ROLE
      },
      {
        teamID: string
        email: string
        userRole: USER_ROLE
        redirectURL: string
      }
    >({
      query: ({ teamID, email, userRole, redirectURL }) => ({
        url: `/teams/${teamID}/inviteByEmail`,
        method: "POST",
        body: {
          email,
          userRole,
          redirectURL: encodeURIComponent(redirectURL),
        },
      }),
      invalidatesTags: ["TeamMembers"],
    }),

    getTeamSubscription: builder.query<ITeamSubscription, string>({
      query: (teamID) => ({
        url: `/teams/${teamID}/billing`,
        method: "GET",
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
  }),
})

export const {
  useGetTeamsInfoQuery,
  useUpdateTeamInfoMutation,
  useDeleteTeamByIDMutation,
  useCreateTeamMutation,
  useGetTeamsInfoAndCurrentIDQuery,
  useLazyGetTeamsInfoQuery,
  useJoinTeamMutation,
  useRemoveTeamMemberByIDMutation,
  useGetMemberListQuery,
  useChangeTeamMemberRoleMutation,
  useGetInviteLinkQuery,
  useChangeTeamInviteLinkEnabledMutation,
  useInviteByEmailMutation,
  useGetTeamSubscriptionQuery,
  useLazyGetCreditUsageInfoQuery,
  useLazyGetPortalURLQuery,
  useGetTeamInfoByIDQuery,
} = teamAPI
