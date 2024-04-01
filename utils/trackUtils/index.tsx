import posthog from "posthog-js"
import { isServerRender } from "@illa-public/utils"
import {
  IReportedTeamInfo,
  IReportedUserInfo,
  TIPISProperties,
  TIPIS_PAGE_NAME,
  TIPIS_TRACK_EVENT_TYPE,
} from "./interface"

export * from "./interface"
export * from "./TipisTrackContext"

class TipisTrackTool {
  private enable: boolean = false

  constructor() {
    this.enable = !!process.env.ILLA_POSTHOG_KEY && !isServerRender
  }

  public originalTrack() {
    return posthog.capture
  }

  public track(event: TIPIS_TRACK_EVENT_TYPE, properties: TIPISProperties) {
    if (this.enable) {
      posthog.capture(event, {
        ...properties,
        environment: process.env.ILLA_APP_ENV,
        fe_version_code: process.env.ILLA_APP_VERSION,
      })
    }
  }

  public pageViewTrack(pageName: TIPIS_PAGE_NAME) {
    if (this.enable) {
      posthog.capture("$pageview", {
        pageName: pageName,
        environment: process.env.ILLA_APP_ENV,
        fe_version_code: process.env.ILLA_APP_VERSION,
      })
    }
  }

  public pageLeaveTrack(pageName: TIPIS_PAGE_NAME) {
    if (this.enable) {
      posthog.capture("$pageleave", {
        pageName: pageName,
        environment: process.env.ILLA_APP_ENV,
        fe_version_code: process.env.ILLA_APP_VERSION,
      })
    }
  }

  public identify(userID: string, userInfo: IReportedUserInfo) {
    if (this.enable) {
      posthog.identify(userID, userInfo)
    }
  }

  public reset() {
    if (this.enable) {
      posthog.reset()
    }
  }

  public group(teamID: string, teamInfo: IReportedTeamInfo) {
    if (this.enable) {
      posthog.group("company", teamID, teamInfo)
    }
  }
}

export const TipisTrack = new TipisTrackTool()
