import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import ArrayIcon from "./assets/array.svg"
import BooleanIcon from "./assets/boolean.svg"
import FunctionIcon from "./assets/function.svg"
import KeywordIcon from "./assets/keyword.svg"
import NullIcon from "./assets/null.svg"
import NumberIcon from "./assets/number.svg"
import ObjectIcon from "./assets/object.svg"
import StringIcon from "./assets/string.svg"
import TableIcon from "./assets/table.svg"
import TypeIcon from "./assets/type.svg"
import UnknownIcon from "./assets/undefine.svg"
import {
  defaultHighlightClassName,
  errorHighlightClassName,
} from "./extensions/heighLightJSExpression"

export const ILLACodeMirrorTheme = {
  "&.cm-editor": {
    borderRadius: "8px",
    border: `1px solid ${getColor("grayBlue", "03")}`,
    overflow: "hidden",
    fontFamily: "Fira Code",
  },
  "&.cm-editor .cm-scroller": {
    lineHeight: "22px",
    fontSize: "12px",
  },
  "&.cm-editor .cm-content": {
    padding: "4px 0",
  },
  "&.cm-editor .cm-line": {
    padding: "0 16px",
  },
  "&.cm-editor.cm-focused .cm-matchingBracket": {
    color: getColor("green", "03"),
  },
  "&.cm-editor .cm-placeholder": {
    color: getColor("grayBlue", "04"),
    height: 0,
  },
  "&.cm-editor .cm-gutters .cm-gutter .cm-gutterElement": {
    padding: "0 8px 0 23px",
  },
  "&.cm-editor .cm-gutters": {
    borderRadius: "8px 0 0 8px",
    borderRight: "none",
  },
  [`.${defaultHighlightClassName}`]: {
    color: getColor("green", "03"),
    backgroundColor: "rgba(0, 170, 91, 0.08);",
  },
  [`.${errorHighlightClassName}`]: {
    color: getColor("red", "03"),
    backgroundColor: "rgba(255, 71, 71, 0.08);",
  },
}

export const illaCodeMirrorTooltipStyle = () => {
  const baseCompletionIconStyle = css`
    width: 14px;
    height: 14px;
    font-size: 14px;
    opacity: 1;
  `
  return css`
    .cm-tooltip.cm-tooltip-autocomplete {
      z-index: 9999;
      border-radius: 8px;
      border: none;
      background-color: ${getColor("white", "01")};
      border: 1px solid ${getColor("greyBlue", "08")};
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.16);
      padding: 1px;

      ul[aria-label="Completions"] {
        font-family: "Fira Code", monospace;
        li[role="option"] {
          border-radius: 8px;
          height: 24px;
          line-height: 24px;
          position: relative;
          overflow: hidden;
          padding: 1px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          &[aria-selected] {
            background-color: ${getColor("techPurple", "08")};
            color: ${getColor("techPurple", "03")};
          }
          [class="cm-completionIcon"] {
            display: none;
          }
          [class^="cm-completionIcon-"],
          [class*=" cm-completionIcon-"] {
            display: flex;
            align-items: center;
            font-size: 14px;
            width: 14px;
            height: 14px;
            flex: none;
            line-height: 14px;
            opacity: 1;
            padding-right: 0;
          }
          .cm-completionIcon-Function::after {
            ${baseCompletionIconStyle};
            content: url(${FunctionIcon});
          }
          .cm-completionIcon-Number::after {
            ${baseCompletionIconStyle};
            content: url(${NumberIcon});
          }
          .cm-completionIcon-String::after {
            ${baseCompletionIconStyle};
            content: url(${StringIcon});
          }
          .cm-completionIcon-Boolean::after {
            ${baseCompletionIconStyle};
            content: url(${BooleanIcon});
          }
          .cm-completionIcon-Null::after {
            ${baseCompletionIconStyle};
            content: url(${NullIcon});
          }
          .cm-completionIcon-Object::after {
            ${baseCompletionIconStyle};
            content: url(${ObjectIcon});
          }
          .cm-completionIcon-Array::after {
            ${baseCompletionIconStyle};
            content: url(${ArrayIcon});
          }
          .cm-completionIcon-Unknown::after {
            ${baseCompletionIconStyle};
            content: url(${UnknownIcon});
          }
          .cm-completionIcon-keyword::after {
            ${baseCompletionIconStyle};
            content: url(${KeywordIcon});
          }
          .cm-completionIcon-type::after {
            ${baseCompletionIconStyle};
            content: url(${TypeIcon});
          }
          .cm-completionIcon-table::after {
            ${baseCompletionIconStyle};
            content: url(${TableIcon});
          }
          .cm-completionLabel {
            font-size: 12px;
            width: 100%;
            line-height: normal;
            .cm-completionMatchedText {
              font-weight: 600;
              text-decoration: none;
            }
          }
          .cm-completionDetail {
            margin: 0;
            color: ${getColor("grayBlue", "04")};
            font-size: 12px;
            font-style: normal;
            flex: none;
            max-width: 70px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .cm-completionInfo {
        padding: 4px 8px;
        background-color: ${getColor("white", "01")};
        border: 1px solid ${getColor("greyBlue", "08")};
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        width: 287px;
        &.cm-completionInfo-right {
          left: calc(100% + 8px);
        }
        .completionInfoCardTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cardTitle {
            width: 100%;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: ${getColor("techPurple", "03")};
          }
          .openInfo {
            width: 12px;
            height: 12px;
            display: flex;
            align-items: center;
          }
        }
        .completionInfoType {
          font-size: 12px;
          color: ${getColor("grayBlue", "02")};
          margin: 0;
          line-height: 20px;
          word-break: break-all;
        }
        .completionInfoEvaluatesTitle {
          font-size: 12px;
          color: ${getColor("grayBlue", "02")};
          margin: 0;
          font-weight: 500;
          line-height: 20px;
        }
        .completionInfoDoc {
          font-size: 12px;
          color: ${getColor("grayBlue", "04")};
          margin: 0;
          line-height: 20px;
        }
        .evaluatesResult {
          display: inline-block;
          margin: 0;
          padding: 0 8px;
          font-size: 12px;
          line-height: 18px;
          color: ${getColor("grayBlue", "02")};
          background-color: ${getColor("grayBlue", "09")};
          position: relative;
          cursor: pointer;
          :hover {
            .evaluatesTooltips {
              visibility: visible;
            }
          }
          .evaluatesTooltips {
            visibility: hidden;
            font-family: "Fira Code", monospace;
            position: absolute;
            left: calc(100% + 4px);
            top: -50%;
            max-height: 162px;
            border-radius: 4px;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.16);
            background-color: ${getColor("grayBlue", "01")};
            padding: 12px 16px;
            font-size: 14px;
            line-height: 18px;
            color: ${getColor("white", "01")};
            white-space: pre;
            overflow-y: auto;
            cursor: auto;
          }
        }
      }
    }
  `
}
