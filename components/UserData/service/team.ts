import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net"
import { TeamInfo } from "@illa-public/public-types"
import { prepareHeaders } from "./prepareHeaders"

export const teamAPI = createApi({
  reducerPath: "teamAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["Teams"],
  endpoints: (builder) => ({
    getTeamsInfo: builder.query<TeamInfo[], null>({
      query: () => "teams/my",
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
              currentTeamID: undefined,
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
      providesTags: ["Teams"],
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
          teamAPI.util.updateQueryData(
            "getTeamsInfoAndCurrentID",
            undefined,
            (draft) => {
              draft.teams = draft.teams.map((team) => {
                if (team.id === teamID) {
                  return {
                    ...team,
                    ...data,
                  }
                }
                return team
              })
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
              "getTeamsInfoAndCurrentID",
              undefined,
              (draft) => {
                draft.teams = [...(draft.teams || []), data]
                draft.currentTeamID = data.id
                draft.currentTeamInfo = data
              },
            ),
          )
        } catch {}
      },
    }),

    deleteTeamByID: builder.mutation<undefined, string>({
      query: (teamID) => ({
        method: "DELETE",
        url: `/teams/${teamID}`,
      }),
      async onQueryStarted(teamID, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          teamAPI.util.updateQueryData(
            "getTeamsInfoAndCurrentID",
            undefined,
            (draft) => {
              const currentTeams =
                draft.teams?.filter((teamInfo) => teamInfo.id !== teamID) || []
              draft.teams = currentTeams
              if (currentTeams.length > 0) {
                draft.currentTeamID = currentTeams[0].id
                draft.currentTeamInfo = currentTeams[0]
              }
              if (currentTeams.length === 0) {
                draft.currentTeamID = undefined
                draft.currentTeamInfo = undefined
              }
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
  }),
})

export const {
  useGetTeamsInfoQuery,
  useChangeTeamConfigMutation,
  useDeleteTeamByIDMutation,
  useCreateTeamMutation,
  useGetTeamsInfoAndCurrentIDQuery,
  useLazyGetTeamsInfoQuery,
} = teamAPI
