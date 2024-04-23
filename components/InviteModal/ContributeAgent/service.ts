import { marketplaceTeamRequest } from "@illa-public/illa-net"

export const updateAgentContribute = (
  teamID: string,
  productID: string,
  hashtags: string[],
  publishConfiguration: boolean,
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${productID}/updatePropertyWith?property=hashtags,publishConfiguration`,
      data: {
        hashtags,
        publishConfiguration,
      },
    },
    {
      teamID: teamID,
    },
  )
}

export const contributeAgentWithHashtags = (
  teamID: string,
  productID: string,
  hashtags: string[],
  publishConfiguration: boolean,
) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${productID}/recontributeWith?property=hashtags,publishConfiguration`,
      data: {
        hashtags,
        publishConfiguration,
      },
    },
    {
      teamID: teamID,
    },
  )
}
