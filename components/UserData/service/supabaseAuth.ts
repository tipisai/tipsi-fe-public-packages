import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Provider,
  Session,
  UserIdentity,
  createClient,
} from "@supabase/supabase-js"

const supabase = createClient(
  process.env.ILLA_SUPABASE_URL!,
  process.env.ILLA_SUPABASE_ANON_KEY!,
)

const SUCCESS_AUTH_REDIRECT = `${process.env.ILLA_V2_DASH_URL_ORIGIN}/authRedirect`

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Session", "Identifier"],
  endpoints: (builder) => ({
    getAuthSession: builder.query<{ session: Session | null }, null>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          return { error }
        }
        return { data }
      },
      providesTags: ["Session"],
    }),

    authByMagicLink: builder.mutation<
      null,
      { email: string; name: string; language: string }
    >({
      queryFn: async ({ email, name, language }) => {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: SUCCESS_AUTH_REDIRECT,
            data: {
              name,
              language,
            },
          },
        })
        if (error) {
          return { error }
        }
        return { data: null }
      },
      invalidatesTags: ["Session"],
    }),

    authBySocial: builder.mutation<
      { provider: Provider; url: string },
      Provider
    >({
      queryFn: async (provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: SUCCESS_AUTH_REDIRECT,
          },
        })
        if (error) {
          return { error }
        }
        return { data }
      },
      invalidatesTags: ["Session"],
    }),

    getIdentifiers: builder.query<UserIdentity[], null>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUserIdentities()
        if (error) {
          return { error }
        }
        return { data: data.identities || [] }
      },
      providesTags: ["Identifier"],
    }),

    linkIdentity: builder.mutation<
      null,
      { provider: Provider; redirectTo: string }
    >({
      queryFn: async ({ provider, redirectTo }) => {
        const { error } = await supabase.auth.linkIdentity({
          provider,
          options: {
            redirectTo,
          },
        })
        if (error) {
          return { error }
        }
        return { data: null }
      },
      invalidatesTags: ["Session"],
    }),

    unlinkIdentity: builder.mutation<null, UserIdentity>({
      queryFn: async (userIdentity) => {
        const { error } = await supabase.auth.unlinkIdentity(userIdentity)
        if (error) {
          return { error }
        }
        return { data: null }
      },
      onQueryStarted: async (userIdentity, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          supabaseApi.util.updateQueryData("getIdentifiers", null, (draft) => {
            draft = draft.filter(
              (identifiers) => identifiers.provider !== userIdentity.provider,
            )
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

    signOut: builder.mutation<null, null>({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          return { error }
        }
        return { data: null }
      },
      invalidatesTags: ["Session"],
    }),
  }),
})

export const {
  useGetAuthSessionQuery,
  useAuthByMagicLinkMutation,
  useAuthBySocialMutation,
  useUnlinkIdentityMutation,
  useLinkIdentityMutation,
  useSignOutMutation,
  useGetIdentifiersQuery,
} = supabaseApi
