import { vercel } from "@t3-oss/env-core/presets-zod"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod/v4"

export default createEnv({
  server: {
    // Google
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),

    // Apple
    AUTH_APPLE_ID: z.string(),
    AUTH_APPLE_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_CONVEX_URL: z.url(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
  extends: [vercel()],
})
