import Icon from "@ant-design/icons"
import { Button, Input, Space } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getColor } from "@illa-public/color-scheme"
import { AddIcon, DeleteIcon } from "@illa-public/icon"
import { RecordEditorProps } from "./interface"
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  subLabelStyle,
} from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const {
    readOnly,
    fillOnly,
    name,
    records,
    label,
    subLabel,
    onSubLabelClick,
    onDelete,
    onAdd,
    onChangeKey,
    onChangeValue,
  } = props

  const { t } = useTranslation()

  return (
    <div css={applyRecordEditorContainerStyle(label)}>
      {label != "" && (
        <span css={recordEditorLabelStyle}>
          <span>{label}</span>
          {subLabel && (
            <span css={subLabelStyle} onClick={onSubLabelClick}>
              {subLabel}
            </span>
          )}
        </span>
      )}
      <div css={recordEditorStyle}>
        {records?.map((record, index) => {
          return (
            <Space.Compact block key={index}>
              <Input
                height="32px"
                value={record.key}
                readOnly={fillOnly || readOnly}
                style={{
                  minWidth: "160px",
                }}
                placeholder="key"
                onChange={(e) => {
                  const value = e.target.value
                  onChangeKey?.(
                    index,
                    value.replace(/[ {}\s]/g, "").trim(),
                    record.value,
                    name,
                  )
                }}
              />
              <Input
                height="32px"
                style={{
                  minWidth: "160px",
                }}
                readOnly={readOnly}
                placeholder="value"
                value={record.value}
                onChange={(e) => {
                  const value = e.target.value
                  onChangeValue?.(
                    index,
                    record.key,
                    value.replace(/{{|}}/g, ""),
                    name,
                  )
                }}
              />
              {!(fillOnly || readOnly) && (
                <Button
                  style={{
                    minWidth: "32px",
                  }}
                  onClick={() => {
                    onDelete?.(index, record, name)
                  }}
                  icon={<Icon component={DeleteIcon} />}
                />
              )}
            </Space.Compact>
          )
        })}
        {!(fillOnly || readOnly) && (
          <span>
            <Button
              style={{
                marginBottom: "8px",
                padding: "1px 8px",
                minWidth: "32px",
                color: getColor("techPurple", "03"),
              }}
              type="text"
              onClick={() => {
                onAdd?.(name)
              }}
              icon={<Icon component={AddIcon} />}
            >
              {t("editor.action.panel.btn.new")}
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

RecordEditor.displayName = "RecordEditor"
