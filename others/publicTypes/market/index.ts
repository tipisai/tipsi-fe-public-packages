import { Agent } from "../agent"

export interface ContributorTeam {
  teamID: string
  icon: string
  name: string
  teamIdentifier: string
}

export interface MarketplaceInfo {
  marketplaceID: string
  numStars: number
  numForks: number
  numRuns: number
  contributorTeam: ContributorTeam
  createdBy: string
  createdAt: string
  hashtags: string[]
  updatedBy: string
  updatedAt: string
  isStarredByCurrentUser: boolean
}

export interface MarketAIAgent {
  aiAgent: Agent
  marketplace: MarketplaceInfo
}
