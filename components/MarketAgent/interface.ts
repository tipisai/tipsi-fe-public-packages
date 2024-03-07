import { AI_AGENT_MODEL } from "@illa-public/public-types"
import { ReactNode } from "react"

export interface LLM {
  name: string
  logo: ReactNode
  value: AI_AGENT_MODEL
}
