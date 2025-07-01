import { createEnv } from "@100times/env/core"
import { sentry } from "@100times/env/presets"
import * as z from "@100times/utils/schema"

export default createEnv({
  client: {
    EXPO_PUBLIC_CONVEX_URL: z.string(),
  },

  clientPrefix: "EXPO_PUBLIC_",
  extends: [sentry.expo()],
  runtimeEnv: process.env,
})
