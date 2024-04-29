import { SerializedStyles } from "@emotion/react"
import { ILLACodeMirrorProps } from "./CodeMirror/interface"

export interface ICodeEditorProps {
  value?: ILLACodeMirrorProps["value"]
  onChange?: ILLACodeMirrorProps["onChange"]
  onFocus?: ILLACodeMirrorProps["onFocus"]
  onBlur?: ILLACodeMirrorProps["onBlur"]
  editable?: ILLACodeMirrorProps["editable"]
  readOnly?: ILLACodeMirrorProps["editable"]
  placeholder?: ILLACodeMirrorProps["placeholder"]
  options?: ILLACodeMirrorProps["extensionOptions"]
  completionOptions: ILLACodeMirrorProps["completionOptions"]
  styles?: ILLACodeMirrorProps["styles"]
  wrapperCss?: SerializedStyles
  canExpand?: boolean
  modalTitle?: string
}

export enum CODE_LANG {
  "JAVASCRIPT" = "javascript",
  "JSON" = "json",

  "SQL" = "sql",
  "PGSQL" = "pgsql",
  "MYSQL" = "mysql",
  "MARIASQL" = "mariasql",
  "MSSQL" = "mssql",
  "SQLite" = "sqlite",
  "CASSANDRA" = "cassandra",
  "PLSQL" = "plsql",

  "MARKDOWN" = "markdown",
}

export enum DATA_VALUE_TYPE {
  OBJECT = "Object",
  NUMBER = "Number",
  ARRAY = "Array",
  FUNCTION = "Function",
  BOOLEAN = "Boolean",
  STRING = "String",
  UNKNOWN = "Unknown",
}
