import { Agent } from "../agent"

export interface IContributorTeam {
  teamID: string
  icon: string
  name: string
  teamIdentifier: string
}

export interface IMarketplaceConfig {
  publishConfiguration: boolean
}

export interface IMarketplaceInfo {
  marketplaceID: string
  numStars: number
  numForks: number
  numRuns: number
  contributorTeam: IContributorTeam
  createdBy: string
  createdAt: string
  hashtags: string[]
  updatedBy: string
  updatedAt: string
  isStarredByCurrentUser: boolean
  config: IMarketplaceConfig
}

export interface IMarketAIAgent {
  aiAgent: Agent
  marketplace: IMarketplaceInfo
}
