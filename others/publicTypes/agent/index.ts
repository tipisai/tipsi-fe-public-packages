import { Params } from ".."

export enum AI_AGENT_MODEL {
  GPT_3_5 = 1,
  GPT_4 = 3,
  GLM_4 = 12,
  MISTRAL = 13,
  CLAUDE = 15,
  MOONSHOT = 16,
}

export enum AI_AGENT_TYPE {
  CHAT = 1,
  TEXT_GENERATION = 2,
}

export interface AgentAdvanceConfig {
  stream: boolean
}

export interface IKnowledgeFile {
  fileName: string
  contentType: string
  fileID: string
  downloadURL?: string
}

export enum SCHEDULE_TYPES {
  EVERY_HOUR = "Every hour",
  EVERY_DAY = "Every day",
  EVERY_WEEK = "Every week",
  EVERY_MONTH = "Every month",
  EVERY_YEAR = "Every year",
}

export enum DAY_OF_WEEK {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export interface IScheduleOptions {
  interval?: number
  minute?: number
  hour?: number
  weekday?: DAY_OF_WEEK
  dayOfMonth?: string
  month?: number
}

export interface ISchedule {
  enabled: boolean
  timezone: string
  type: SCHEDULE_TYPES
  options: IScheduleOptions
}

export interface AgentRaw {
  name: string
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  prompt: string
  modelConfig: AgentAdvanceConfig
  icon: string
  description: string
  knowledge: IKnowledgeFile[]
}

export interface AgentEditor {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

export interface Agent extends AgentRaw {
  aiAgentID: string
  teamIdentifier: string
  teamID: string
  teamIcon: string
  teamName: string
  publishedToMarketplace: boolean
  createdAt: string
  createdBy: string
  updatedBy: string
  updatedAt: string
  editedBy: AgentEditor[]
  knowledge: IKnowledgeFile[]
  schedule: ISchedule
}
