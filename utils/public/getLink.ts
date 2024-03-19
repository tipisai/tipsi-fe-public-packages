import { isCloudVersion, isServerRender } from "./typeHelper"

export const getILLACloudURL = (customDomain?: string): string => {
  if (customDomain) {
    return `https://${customDomain}/cloud`
  }
  if (process.env.ILLA_CLOUD_URL || isCloudVersion || isServerRender) {
    return `${process.env.ILLA_CLOUD_URL}`
  } else {
    return `${location.origin}/cloud`
  }
}

export const getMarketLinkTemplate = (appID: string): string => {
  return `${process.env.ILLA_MARKET_URL}/app/${appID}/detail`
}

export const getPublicLinkTemplate = (
  teamIdentify: string,
  appID: string,
): string => {
  return `${process.env.ILLA_BUILDER_URL}/${teamIdentify}/deploy/app/${appID}`
}

export const getAgentPublicLink = (agentID: string): string => {
  return `${process.env.ILLA_MARKET_URL}/ai-agent/${agentID}/detail`
}
