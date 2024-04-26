import { IBaseFunction } from "."

export enum LARK_BOT_CONTENT_MODE {
  GUI = "gui",
  JSON = "json",
}

export enum LARK_BOT_AT_USER_TYPE {
  "SINGLE_USER" = "single_user",
  "ALL" = "all",
}

export interface ITextContent {
  text: string
}

export interface IImageContent {
  image_key: string
}

export interface IUrlContent {
  text: string
  href: string
}

export interface IAtUserContent {
  atType: LARK_BOT_AT_USER_TYPE
  user_id: string
}

interface IBaseLarkBotFunction {
  language: string[]
  title: string
  contentMode: LARK_BOT_CONTENT_MODE
}

export interface IGuiLarkBotFunctionContent extends IBaseLarkBotFunction {
  contentMode: LARK_BOT_CONTENT_MODE.GUI
  content: (ITextContent | IImageContent | IUrlContent | IAtUserContent)[]
}

export interface IJsonLarkBotFunctionContent extends IBaseLarkBotFunction {
  contentMode: LARK_BOT_CONTENT_MODE.JSON
  content: string
}

export type TLarkBotFunctionContent =
  | IGuiLarkBotFunctionContent
  | IJsonLarkBotFunctionContent

export enum LARK_BOT_ACTION_OPERATION {
  FEISHU_IM_SEND_MESSAGE = "feishuim/sendMessage",
  LARK_IM_SEND_MESSAGE = "larkim/sendMessage",
}

export interface ILarkBotFUnction extends IBaseFunction {
  resourceType: "larkBot"
  content: TLarkBotFunctionContent | {}
  actionOperation: LARK_BOT_ACTION_OPERATION
}
