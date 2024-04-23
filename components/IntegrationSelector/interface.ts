import { TIntegrationType } from "@illa-public/public-types"

export interface ResourceTypeSelectorProps {
  onSelect: (item: TIntegrationType) => void
  filterResourceType?: (item: TIntegrationType) => boolean
}
