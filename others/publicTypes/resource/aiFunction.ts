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

interface IBaseAIFunctionResourceContent {
  baseUrl: string
  urlParams: Params[]
  headers: Params[]
  cookies: Params[]
  authentication: TAIFunctionAuthType
  selfSignedCert: boolean
  certs: {
    caCert: string
    clientKey: string
    clientCert: string
    mode: TAIFunctionVerifyMode
  }
}

export interface INoneAuthAIFunctionResourceContent
  extends IBaseAIFunctionResourceContent {
  authentication: "none"
  authContent: IAIFunctionNoneAuth
}

export interface IBasicAuthAIFunctionResourceContent
  extends IBaseAIFunctionResourceContent {
  authentication: "basic"
  authContent: IAIFunctionBasicAuth
}

export interface IBearerAuthAIFunctionResourceContent
  extends IBaseAIFunctionResourceContent {
  authentication: "bearer"
  authContent: IAIFunctionAPIBearerAuth
}

export interface IDigestAuthAIFunctionResourceContent
  extends IBaseAIFunctionResourceContent {
  authentication: "digest"
  authContent: IAIFunctionDigestAuth
}

export type TAIFunctionResourceContent =
  | INoneAuthAIFunctionResourceContent
  | IBasicAuthAIFunctionResourceContent
  | IBearerAuthAIFunctionResourceContent
  | IDigestAuthAIFunctionResourceContent

export interface IAIFunctionResource
  extends IBaseResource<TAIFunctionResourceContent> {
  resourceType: "function"
}
