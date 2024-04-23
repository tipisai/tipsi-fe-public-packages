import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ResourceCard } from "./components/ResourceCard"
import { SuggestResourceCard } from "./components/ResourceCard/suggestCard"
import { Apis } from "./config"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect, filterResourceType } = props

  const { t } = useTranslation()

  const ResourceTypeList = [
    {
      title: t("editor.action.type.api"),
      item: Apis,
      category: "apis" as const,
    },
  ]

  const finalResourceTypeList = ResourceTypeList.filter((resource) => {
    const { item } = resource

    const finalItems = item
      .filter(({ hidden }) => !hidden)
      .filter(({ resourceType }) => {
        if (filterResourceType) {
          return filterResourceType(resourceType)
        }
        return resourceType
      })
    return finalItems.length > 0
  })

  return (
    <div css={containerStyle}>
      {finalResourceTypeList.map(({ title, item, category }) => {
        return (
          <div key={category}>
            <span css={categoryStyle}>{title}</span>
            <div css={resourceListStyle}>
              {item
                .filter(({ hidden }) => !hidden)
                .filter(({ resourceType }) => {
                  if (filterResourceType) {
                    return filterResourceType(resourceType)
                  }
                  return resourceType
                })
                .map(({ resourceType }) => (
                  <ResourceCard
                    key={resourceType}
                    onSelect={(item) => {
                      onSelect(item)
                    }}
                    resourceType={resourceType}
                  />
                ))}
            </div>
          </div>
        )
      })}
      <div>
        <span css={categoryStyle}>
          {t("editor.action.form.title.feedback")}
        </span>
        <div css={resourceListStyle}>
          <SuggestResourceCard />
        </div>
      </div>
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
