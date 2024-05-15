export enum USER_ROLE {
  "GUEST" = -1,
  "OWNER" = 1,
  "ADMIN",
  "EDITOR",
  "VIEWER",
}

export enum USER_STATUS {
  "OK" = 1,
  "PENDING" = 2,
}

export interface IUserInfoVO {
  id: string
  nickname: string
  avatarUrl: string
  language: string
  personalization: Record<string, unknown> | null

  // temp
  email: string
}
