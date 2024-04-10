import { useGetUserInfoQuery } from "../service/user"

export const useGetUserInfo = () => {
  const userInfo = useGetUserInfoQuery(null, {
    selectFromResult: ({ data }) => ({
      userInfo: data,
    }),
  })

  return userInfo
}
