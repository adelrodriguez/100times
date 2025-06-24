import { vercel } from "@t3-oss/env-core/presets-zod"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod/v4"

export default createEnv({
  server: {
    BASE_URL: z.url(),

    DATABASE_URL: z.url(),
    DATABASE_AUTH_TOKEN: z.string(),
    RUN_PRODUCTION_MIGRATIONS: z.stringbool().default(false),

    // Google
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    // Apple
    APPLE_CLIENT_ID: z.string(),
    APPLE_CLIENT_SECRET: z.string(),
    APPLE_APP_BUNDLE_IDENTIFIER: z.string(),
  },
  experimental__runtimeEnv: {},
  extends: [vercel()],
})
