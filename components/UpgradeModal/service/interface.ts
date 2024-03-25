import { ICreditInfo, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"

export interface SubscribeResponse {
  url: string
}

export interface ITeamSubscription {
  creditInfo: {
    current: ICreditInfo
  }
}
export interface CreditUsageInfoResponse {
  driveVolumeUsage: number
  driveVolumeUsagePercent: number
  driveTrafficUsage: number
  driveTrafficUsagePercent: number
  aiTokenGeneralUsage: number
  aiTokenGeneralUsagePercent: number
  totalCollaUsage: number
}

export const CREDIT_UNIT_PRICE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 10,
  [SUBSCRIPTION_CYCLE.YEARLY]: 100,
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const CREDIT_UNIT_BY_CYCLE = {
  [SUBSCRIPTION_CYCLE.FREE]: 0,
  [SUBSCRIPTION_CYCLE.MONTHLY]: 5, // unit collar by month
  [SUBSCRIPTION_CYCLE.YEARLY]: 60, // unit collar by year
  [SUBSCRIPTION_CYCLE.LIFETIME]: -1,
}

export const UNIT_CREDIT_CONVERSION_STORAGE = 1
export const UNIT_CREDIT_CONVERSION_TRAFFIC = 1
export const UNIT_CREDIT_CONVERSION_TOKEN = 20
