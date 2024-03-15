import { IBaseResource } from "."
import { Params } from "../public/common"

export interface IAIFunctionNoneAuth {}

export interface IAIFunctionBasicAuth {
  username: string
  password: string
}

export interface IAIFunctionAPIBearerAuth {
  token: string
}

export interface IAIFunctionDigestAuth {
  username: string
  password: string
}

export type TAIFunctionAuthType = "none" | "basic" | "bearer" | "digest"

export type TAIFunctionVerifyMode = "verify-full" | "verify-ca" | "skip"

export type IAIFunctionMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"

export type IAIFunctionBodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary"

export type IAIFunctionRawBodyType =
  | "text"
  | "json"
  | "xml"
  | "javascript"
  | "html"

export interface IAIFunctionRawBody {
  type: IAIFunctionRawBodyType
  content: string
}

export type IAIFunctionBodyContent =
  | null
  | Params[]
  | string
  | IAIFunctionRawBody

interface IBaseAIFunctionResourceContent<
  T extends IAIFunctionBodyContent = null,
> {
  method: IAIFunctionMethod
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: TAIFunctionAuthType
  selfSignedCert: boolean
  bodyType: IAIFunctionBodyType
  body: T
  certs: {
    caCert: string
    clientKey: string
    clientCert: string
    mode: TAIFunctionVerifyMode
  }
}
export interface INoneAuthAIFunctionResourceContent<
  T extends IAIFunctionBodyContent,
> extends IBaseAIFunctionResourceContent<T> {
  authentication: "none"
  authContent: IAIFunctionNoneAuth
}

export interface IBasicAuthAIFunctionResourceContent<
  T extends IAIFunctionBodyContent,
> extends IBaseAIFunctionResourceContent<T> {
  authentication: "basic"
  authContent: IAIFunctionBasicAuth
}

export interface IBearerAuthAIFunctionResourceContent<
  T extends IAIFunctionBodyContent,
> extends IBaseAIFunctionResourceContent<T> {
  authentication: "bearer"
  authContent: IAIFunctionAPIBearerAuth
}

export interface IDigestAuthAIFunctionResourceContent<
  T extends IAIFunctionBodyContent,
> extends IBaseAIFunctionResourceContent<T> {
  authentication: "digest"
  authContent: IAIFunctionDigestAuth
}

export type TAIFunctionResourceContent<T extends IAIFunctionBodyContent> =
  | INoneAuthAIFunctionResourceContent<T>
  | IBasicAuthAIFunctionResourceContent<T>
  | IBearerAuthAIFunctionResourceContent<T>
  | IDigestAuthAIFunctionResourceContent<T>

export interface IAIFunctionResource<T extends IAIFunctionBodyContent = null>
  extends IBaseResource<TAIFunctionResourceContent<T>> {
  resourceType: "function"
}
