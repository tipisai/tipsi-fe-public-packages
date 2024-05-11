import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { Provider, Session, createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.ILLA_SUPABASE_URL!,
  process.env.ILLA_SUPABASE_KEY!,
)

const SUCCESS_AUTH_REDIRECT = `${process.env.ILLA_CLOUD_URL}/authRedirect`

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Session"],
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
  }),
})

export const {
  useGetAuthSessionQuery,
  useAuthByMagicLinkMutation,
  useAuthBySocialMutation,
} = supabaseApi
