import {
  publicHashtagRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import { ProductMarketApp } from "@illa-public/market-app"
import { MarketAIAgent } from "@illa-public/public-types"
import { HASHTAG_REQUEST_TYPE } from "../../constants"

export const fetchRecommendHashtag = (type: HASHTAG_REQUEST_TYPE) => {
  return publicHashtagRequest<{
    hashtags: string[]
  }>({
    method: "GET",
    url: `/defaultHashtagsList/unitType/${type}`,
  })
}

export const fetchAppDetailInfoByAppID = (appID: string) => {
  return publicMarketplaceRequest<ProductMarketApp>({
    method: "GET",
    url: `/apps/${appID}`,
  })
}

export const fetchAgentDetailInfoByAgentID = (aiAgentID: string) => {
  return publicMarketplaceRequest<MarketAIAgent>({
    method: "GET",
    url: `/aiAgents/${aiAgentID}`,
  })
}
