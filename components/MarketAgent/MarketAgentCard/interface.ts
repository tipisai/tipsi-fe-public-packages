import { MarketAIAgent } from "@illa-public/public-types"
import { HTMLAttributes } from "react"

export interface MarketAgentCardProps extends HTMLAttributes<HTMLDivElement> {
  marketAIAgent: MarketAIAgent
}
