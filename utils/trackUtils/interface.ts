type TipisPropertiesPrefix<T extends string, U> = `${T}${string & U}`

type TipisPrefixedPropertiesInterface<T extends string, U> = {
  [key in TipisPropertiesPrefix<T, keyof U>]: unknown
}

interface TipisExtendedProperties {
  [key: string]: unknown
}

type TipisPrefixedExtendProperties = TipisPrefixedPropertiesInterface<
  "parameter",
  TipisExtendedProperties
>

export type TIPISProperties = TipisPrefixedExtendProperties

export enum TIPIS_TRACK_CLOUD_PAGE_NAME {
  HOMEPAGE = "homepage",
  SETTING_PASSWORD = "setting_password",
  SETTING_ACCOUNT = "setting_account",
  SETTING_LANGUAGE = "setting_language",
  SETTING_LINKED = "setting_linked",
  SETTING_INFO = "setting_info",
  SETTING_MEMBER = "setting_member",
  SETTING_BILLING = "setting_billing",
  MOBILE_SETTING_NAV = "mobile_setting_nav",
}

export enum TIPIS_TRACK_PUBLIC_PAGE_NAME {
  LOGIN = "login",
  SIGNUP = "sign_up",
  FORGET_PASSWORD = "forget_password",
  PLACEHOLDER = "tipis",
}

export enum TIPIS_TRACK_MARKET_PAGE_NAME {
  COMMUNITY_AGENT_HOMEPAGE = "community_agent_homepage",
  COMMUNITY_AGENT_DETAIL = "community_agent_detail",
  COMMUNITY_APP_HOMEPAGE = "community_app_homepage",
  COMMUNITY_APP_DETAIL = "community_app_detail",
}

export type TIPIS_PAGE_NAME =
  | TIPIS_TRACK_CLOUD_PAGE_NAME
  | TIPIS_TRACK_PUBLIC_PAGE_NAME
  | TIPIS_TRACK_MARKET_PAGE_NAME

export interface IReportedUserInfo {
  nickname: string
  email: string
  language: string
}

export interface IReportedTeamInfo {
  name: string
  identifier: string
}
