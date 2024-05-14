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

const SUCCESS_AUTH_REDIRECT = `${process.env.ILLA_CLOUD_URL}/authRedirect`

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

    authByMagicLink: builder.mutation<null, { email: string; name: string }>({
      queryFn: async ({ email, name }) => {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: SUCCESS_AUTH_REDIRECT,
            data: {
              name,
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

    // this need resp by node server
    getIdentifier: builder.query<UserIdentity, Provider>({
      queryFn: async (provider) => {
        const { data, error } = await supabase.auth.getUserIdentities()
        const providerIdentity = data?.identities.find(
          (identity) => identity.provider === provider,
        )
        if (error || !providerIdentity) {
          return { error }
        }
        return { data: providerIdentity }
      },
      providesTags: ["Identifier"],
    }),

    // this need resp by node server
    getProviders: builder.query<Provider[], null>({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()
        const provider =
          (data.user?.app_metadata?.providers as Provider[]) || []
        if (error) {
          return { error }
        }
        return { data: provider }
      },
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
          supabaseApi.util.updateQueryData("getProviders", null, (draft) => {
            draft = draft.filter(
              (provider) => provider !== userIdentity.provider,
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
  }),
})

export const {
  useGetAuthSessionQuery,
  useAuthByMagicLinkMutation,
  useAuthBySocialMutation,
  useUnlinkIdentityMutation,
  useLinkIdentityMutation,
  useLazyGetIdentifierQuery,
  useGetProvidersQuery,
} = supabaseApi
