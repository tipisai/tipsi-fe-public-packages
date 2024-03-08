import Icon from "@ant-design/icons"
import { LoadingIcon } from "@illa-public/icon"
import { Select, Skeleton, Space, Tag } from "antd"
import { debounce } from "lodash-es"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { HASHTAG_REQUEST_TYPE } from "../../../constants"
import { fetchFuzzySearchHashTag } from "../../../service"
import { TagControllerProps } from "../interface"
import {
  fetchAgentDetailInfoByAgentID,
  fetchRecommendHashtag,
} from "../service"
import {
  recommendLabelStyle,
  tagContainer,
  tagInputContainerStyle,
  titleStyle,
} from "./style"

export const TagControllerPC: FC<TagControllerProps> = (props) => {
  const { productType, productID, productContributed, onTagChange } = props

  const { t } = useTranslation()

  const currentInputValue = useRef<string>("")

  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])

  const [recommendTags, setRecommendTags] = useState<string[]>([])

  const [searchRecommendTags, setSearchRecommendTags] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  const [searchRecommendTagsLoading, setSearchRecommendTagsLoading] =
    useState(false)

  useEffect(() => {
    if (!productContributed) {
      setCurrentHashtags([])
      return
    }
    switch (productType) {
      case HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT:
        fetchAgentDetailInfoByAgentID(productID).then((res) => {
          setCurrentHashtags(res.data.marketplace.hashtags)
        })
        break
    }
  }, [productContributed, productID, productType])

  const debounceSearchKeywords = useRef(
    debounce(async (keywords: string) => {
      setSearchRecommendTagsLoading(true)
      try {
        const match = await fetchFuzzySearchHashTag(keywords)
        if (currentInputValue.current === keywords) {
          console.log("match", match)
          setSearchRecommendTags(
            match.data.match.map((v) => ({
              label: v,
              value: v,
            })),
          )
        }
      } catch (e) {
      } finally {
        setSearchRecommendTagsLoading(false)
      }
    }, 160),
  )

  useEffect(() => {
    fetchRecommendHashtag(productType).then((res) => {
      setRecommendTags(res.data.hashtags)
      if (currentInputValue.current === "") {
        setSearchRecommendTags(
          res.data.hashtags.map((v) => ({
            label: v,
            value: v,
          })),
        )
      }
    })
  }, [productType])

  return (
    <div css={tagContainer}>
      <div css={titleStyle}>{t("contribute.tag.tag")}</div>
      <div css={tagInputContainerStyle}>
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          loading={searchRecommendTagsLoading}
          options={searchRecommendTags}
          filterOption={(inputValue, option) => {
            if (inputValue === option?.value) {
              return true
            } else {
              return searchRecommendTags
                .map((tag) => tag.value)
                .includes(option?.value.toString() ?? "")
            }
          }}
          onSearch={(value) => {
            currentInputValue.current = value
            debounceSearchKeywords.current(value as string)
          }}
          notFoundContent={
            searchRecommendTagsLoading ? (
              <Icon component={LoadingIcon} spin />
            ) : null
          }
          placeholder="Enter↵"
          value={currentHashtags}
          onChange={(value) => {
            console.log("value", value)
            onTagChange?.(value as string[])
            setCurrentHashtags(value as string[])
          }}
          labelInValue={false}
          showSearch
        />
      </div>
      <div css={recommendLabelStyle}>{t("contribute.tag.recommended")}</div>
      {recommendTags.length === 0 ? (
        <Skeleton active />
      ) : (
        <Space wrap>
          {recommendTags.map((tag) => (
            <Tag
              bordered={currentHashtags.includes(tag) ? false : true}
              key={tag}
              onClick={() => {
                if (currentHashtags.includes(tag)) {
                  return
                }
                const newTags = [...currentHashtags, tag]
                setCurrentHashtags(newTags)
                onTagChange?.(newTags)
              }}
            >
              {tag}
            </Tag>
          ))}
        </Space>
      )}
    </div>
  )
}
