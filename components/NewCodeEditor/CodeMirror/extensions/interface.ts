export enum CODE_LANG {
  "JAVASCRIPT" = "javascript",
  "SQL" = "sql",
  "HTML" = "html",
  "JSON" = "json",
  "XML" = "xml",
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

export interface IExpressionShape {
  value: string
  hasError: boolean
}

export interface ICodeMirrorOptions {
  showLineNumbers?: boolean
  lang?: CODE_LANG
  sqlScheme?: Record<string, unknown>
  singleLine?: boolean
  autoCompleteTipContainer?: HTMLElement
}

export interface ICompletionOption {
  key: string
  value: any
  description?: string
  type?: string
}
