import { HTMLAttributes } from "react"
import { IMarketAIAgent } from "@illa-public/public-types"

export interface MarketAgentCardProps extends HTMLAttributes<HTMLDivElement> {
  marketAIAgent: IMarketAIAgent
}
