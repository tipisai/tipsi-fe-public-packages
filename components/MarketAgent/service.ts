import { marketplaceRequest } from "@illa-public/illa-net"
import { IMarketAIAgent } from "@illa-public/public-types"

export enum MARKET_AGENT_SORTED_OPTIONS {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export interface MarketAgentListData {
  products: IMarketAIAgent[]
  hasMore: boolean
  recommendHashtags: string[]
  summaryHashtags?: string[]
}

export const fetchMarketAgentList = (
  page: number = 1,
  sortedBy: MARKET_AGENT_SORTED_OPTIONS,
  search: string = "",
  pageSize: number = 10,
  signal?: AbortSignal,
) => {
  return marketplaceRequest<MarketAgentListData>({
    url: `/aiAgents?page=${page}&limit=${pageSize}&sortedBy=${sortedBy}&search=${search}`,
    method: "GET",
    signal,
  })
}

export const getAIAgentMarketplaceInfo = (
  aiAgentID: string,
  abortSignal?: AbortSignal,
) => {
  return marketplaceRequest<IMarketAIAgent>({
    url: `/aiAgents/${aiAgentID}`,
    method: "GET",
    signal: abortSignal,
  })
}
