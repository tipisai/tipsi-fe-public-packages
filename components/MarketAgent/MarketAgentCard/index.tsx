import Icon from "@ant-design/icons"
import { Avatar } from "@illa-public/avatar"
import { ForkIcon, PlayOutlineIcon, StarOutlineIcon } from "@illa-public/icon"
import { formatNumForAgent } from "@illa-public/utils"
import { FC } from "react"
import CardHashtags from "../BaseHashTag"
import { getLLM } from "../modelList"
import { MarketAgentCardProps } from "./interface"
import {
  actionContainerStyle,
  actionCountStyle,
  actionStyle,
  agentIconStyle,
  cardContentContainerStyle,
  cardStyle,
  descriptionStyle,
  headerStyle,
  iconStyle,
  modalInfoStyle,
  modelLogoStyle,
  modelNameStyle,
  nameStyle,
  teamAvatarStyle,
  teamInfoContainerStyle,
  teamInfoStyle,
  teamNameStyle,
} from "./style"

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { marketAIAgent, ...rest } = props
  const { aiAgent, marketplace } = marketAIAgent ?? {}

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <img css={agentIconStyle} src={aiAgent.icon} alt={aiAgent.name} />
        <div css={teamInfoContainerStyle}>
          <div css={teamInfoStyle}>
            <Avatar
              css={teamAvatarStyle}
              avatarUrl={marketplace?.contributorTeam?.icon}
              name={marketplace?.contributorTeam?.name}
              id={marketplace?.contributorTeam?.teamID}
            />
            <span css={teamNameStyle}>
              {marketplace?.contributorTeam?.name}
            </span>
          </div>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionStyle}>
            <div css={actionCountStyle}>
              <Icon component={ForkIcon} css={iconStyle} />
              {formatNumForAgent(marketplace?.numForks)}
            </div>
            <div css={actionCountStyle}>
              <Icon component={StarOutlineIcon} css={iconStyle} />
              {formatNumForAgent(marketplace?.numStars)}
            </div>
            <div css={actionCountStyle}>
              <Icon component={PlayOutlineIcon} css={iconStyle} />
              {formatNumForAgent(marketplace?.numRuns)}
            </div>
          </div>
        </div>
      </div>
      <div css={cardContentContainerStyle}>
        <span css={nameStyle}>{aiAgent?.name}</span>
        <div css={modalInfoStyle}>
          <div css={modelLogoStyle}>{getLLM(aiAgent?.model)?.logo}</div>
          <div css={modelNameStyle}>{getLLM(aiAgent?.model)?.name}</div>
        </div>
        <div css={descriptionStyle}>{aiAgent?.description}</div>
        {!!(marketplace?.hashtags && marketplace?.hashtags.length) && (
          <CardHashtags cardHashtags={marketplace?.hashtags} />
        )}
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
