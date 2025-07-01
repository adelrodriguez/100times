import { isProduction } from "@100times/utils/environment"
import { createUrlBuilder } from "@100times/utils/url"

import env from "~/shared/env"

export const buildApiUrl = createUrlBuilder(
  env.EXPO_PUBLIC_API_URL,
  isProduction ? "https" : "http"
)
