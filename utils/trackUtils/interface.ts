type TipisPropertiesPrefix<T extends string, U> = `${T}${string & U}`

type TipisPrefixedPropertiesInterface<T extends string, U> = {
  [key in TipisPropertiesPrefix<T, keyof U>]: unknown
}

interface TipisExtendedProperties {
  [key: string]: unknown
}

interface TipisBaseProperties {
  element?: string
}

type TipisPrefixedExtendProperties = TipisPrefixedPropertiesInterface<
  "parameter",
  TipisExtendedProperties
>

export type TIPISProperties = TipisBaseProperties &
  TipisPrefixedExtendProperties

export enum TIPIS_TRACK_EVENT_TYPE {
  VISIT = "visit",
  SHOW = "show",
  CLICK = "click",
  INITIALIZE = "initialize",
  VALIDATE = "validate",
  REQUEST = "request",
  SELECT = "select",
  FOCUS = "focus",
  BLUR = "blur",
  KEYDOWN = "keydown",
  KEYUP = "keyup",
  ADD = "add",
  DRAG = "drag",
  DUPLICATE = "duplicate",
  RENAME = "rename",
  HOVER = "hover",
  CHANGE = "change",
  DELETE = "delete",
  ILLA_ACTIVE = "illa_active",
}

export enum TIPIS_TRACK_CLOUD_PAGE_NAME {
  HOMEPAGE = "cloud_homepage",
  WORKSPACE = "cloud_workspace",
  MEMBER = "cloud_member",
  PROFILE_SETTING = "profile_setting",
  TEAM_SETTING = "team_setting",
  TEAM_MEMBER = "team_member",
  DRIVE_FILES = "drive_files",
  DRIVE_PREVIEW = "drive_preview",
  DRIVE_SHARE = "drive_share",
  DRIVE_CAPACITY = "drive_capacity",
  AUDIT_LOGS = "audit_logs",
  SETTING = "setting",
  PASSWORD_SETTING = "password_setting",
  ACCOUNT_SETTING = "account_setting",
  LANGUAGE_SETTING = "language_setting",
  LINKED_SETTING = "linked_setting",
  APP = "builder_app",
  RESOURCE = "builder_resource",
  AI_AGENT_DASHBOARD = "ai_agent_dashboard",
  FLOW_DASHBOARD = "flow_dashboard",
}

export enum TIPIS_TRACK_PUBLIC_PAGE_NAME {
  LOGIN = "login",
  SIGNUP = "sign_up",
  FORGET_PASSWORD = "forget_password",
  PLACEHOLDER = "tipis",
}

export enum TIPIS_TRACK_BUILDER_PAGE_NAME {
  TUTORIAL = "builder_tutorial",
  EDITOR = "builder_editor",
  PREVIEW = "app_preview",
  DEPLOY = "builder_deploy",
  BUILDER_TUTORIAL_PREVIEW = "builder_tutorial_preview",
  AI_AGENT_RUN = "ai_agent_run",
  AI_AGENT_EDIT = "ai_agent_edit",
  RESOURCE_EDIT = "resource_edit",
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
