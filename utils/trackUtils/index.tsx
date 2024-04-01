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

  public staticProperties = {
    environment: process.env.ILLA_APP_ENV,
    fe_version_code: process.env.ILLA_APP_VERSION,
  }

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
        ...this.staticProperties,
      })
    }
  }

  public pageViewTrack(pageName: TIPIS_PAGE_NAME) {
    if (this.enable) {
      posthog.capture("$pageview", {
        pageName: pageName,
        ...this.staticProperties,
      })
    }
  }

  public pageLeaveTrack(pageName: TIPIS_PAGE_NAME) {
    if (this.enable) {
      posthog.capture("$pageleave", {
        pageName: pageName,
        ...this.staticProperties,
      })
    }
  }

  public identify(userID: string, userInfo: IReportedUserInfo) {
    if (this.enable) {
      posthog.identify(userID, {
        ...userInfo,
        ...this.staticProperties,
      })
    }
  }

  public reset() {
    if (this.enable) {
      posthog.reset()
    }
  }

  public group(teamID: string, teamInfo: IReportedTeamInfo) {
    if (this.enable) {
      posthog.group("company", teamID, {
        ...teamInfo,
        ...this.staticProperties,
      })
    }
  }
}

export const TipisTrack = new TipisTrackTool()
