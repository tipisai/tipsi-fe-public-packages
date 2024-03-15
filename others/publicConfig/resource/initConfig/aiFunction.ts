import {
  IAIFunctionResource,
  TAIFunctionResourceContent,
} from "@illa-public/public-types"

export const aiFunctionContentInit: TAIFunctionResourceContent<null> = {
  baseUrl: "",
  method: "GET",
  bodyType: "none",
  body: null,
  urlParams: [
    {
      key: "",
      value: "",
    },
  ],
  headers: [
    {
      key: "",
      value: "",
    },
  ],
  cookies: [
    {
      key: "",
      value: "",
    },
  ],
  authentication: "none",
  selfSignedCert: false,
  certs: {
    caCert: "",
    clientKey: "",
    clientCert: "",
    mode: "verify-full",
  },
  authContent: {},
}

export const aiFunctionResourceInit: IAIFunctionResource = {
  resourceType: "function",
  content: aiFunctionContentInit,
  resourceID: "",
  resourceName: "",
  createdBy: "",
  updatedBy: "",
  createdAt: "",
  updatedAt: "",
  config: {
    icon: "",
    variables: [],
  },
}
