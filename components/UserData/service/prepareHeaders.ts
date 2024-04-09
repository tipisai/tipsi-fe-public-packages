import { getAuthToken } from "@illa-public/utils"

export function prepareHeaders(headers: Headers) {
  const urlParams = new URLSearchParams(location.search)
  const token = urlParams.get("token") || getAuthToken()
  if (token) {
    headers.set("Authorization", token)
  }
  return headers
}
