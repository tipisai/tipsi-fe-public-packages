import { IMemberVO, ITeamInfoVO } from "@illa-public/public-types"

export interface ITeamStateDataVO {
  items: ITeamInfoVO[]
  currentId: string
  currentMemberList?: IMemberVO[]
}

export const teamInitialState: ITeamStateDataVO = {
  items: [],
  currentId: "",
  currentMemberList: [],
} as ITeamStateDataVO
