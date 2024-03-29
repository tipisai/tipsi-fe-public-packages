import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net"
import { MemberInfo, TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { IUpdateTeamPermissionConfigRequest } from "./interface"
import { prepareHeaders } from "./prepareHeaders"

export const teamAPI = createApi({
  reducerPath: "teamAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Teams", "TeamMembers"],
  endpoints: (builder) => ({
    getTeamsInfo: builder.query<TeamInfo[], null>({
      query: () => "teams/my",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Teams" as const, id })),
              "Teams",
            ]
          : ["Teams"],
    }),

    getTeamsInfoAndCurrentID: builder.query<
      {
        teams: TeamInfo[]
        currentTeamID?: string
        currentTeamInfo?: TeamInfo
      },
      string | undefined
    >({
      async queryFn(teamIdentifier, _queryAPI, _extraOptions, fetchWithBQ) {
        const teamInfoResult = await fetchWithBQ("teams/my")
        if (teamInfoResult.error) {
          return {
            error: teamInfoResult.error,
          }
        }
        const teamInfos = teamInfoResult.data as TeamInfo[]

        if (!teamIdentifier) {
          return {
            data: {
              teams: teamInfos,
            },
          }
        }
        const currentTeam = teamInfos.find(
          (info) => info.identifier === teamIdentifier,
        )
        return {
          data: {
            teams: teamInfos,
            currentTeamID: currentTeam?.id,
            currentTeamInfo: currentTeam,
          },
        }
      },
      async onQueryStarted(teamIdentifier, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

        dispatch(teamAPI.util.upsertQueryData("getTeamsInfo", null, data.teams))
      },

      providesTags: (result) =>
        result
          ? [
              ...result.teams.map(({ id }) => ({ type: "Teams" as const, id })),
              "Teams",
            ]
          : ["Teams"],
    }),

    changeTeamConfig: builder.mutation<
      TeamInfo,
      {
        teamID: string
        data: {
          name?: string
          identifier?: string
          icon?: string
        }
      }
    >({
      query: ({ teamID, data }) => ({
        url: `/teams/${teamID}/config`,
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
      TeamInfo,
      {
        name: string
        identifier: string
      }
    >({
      query: ({ name, identifier }) => ({
        url: "/teams",
        method: "POST",
        body: {
          name,
          identifier,
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
              },
              true,
            ),
          )
        } catch {}
      },
      invalidatesTags: ["Teams"],
    }),

    joinTeam: builder.mutation<TeamInfo, string>({
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
            }),
          )
        } catch {}
      },
      invalidatesTags: ["Teams"],
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

    updateTeamPermissionConfig: builder.mutation<
      undefined,
      {
        teamID: string
        data: IUpdateTeamPermissionConfigRequest
      }
    >({
      query: ({ teamID, data }) => ({
        url: `/teams/${teamID}/permission`,
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
  }),
})

export const {
  useGetTeamsInfoQuery,
  useChangeTeamConfigMutation,
  useDeleteTeamByIDMutation,
  useCreateTeamMutation,
  useGetTeamsInfoAndCurrentIDQuery,
  useLazyGetTeamsInfoQuery,
  useJoinTeamMutation,
  useRemoveTeamMemberByIDMutation,
  useGetMemberListQuery,
  useChangeTeamMemberRoleMutation,
  useUpdateTeamPermissionConfigMutation,
} = teamAPI
