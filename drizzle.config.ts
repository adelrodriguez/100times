import { defineConfig } from "drizzle-kit"
import env from "~/shared/env/server"

if (
  !env.DATABASE_URL?.includes("localhost") &&
  !env.DATABASE_URL?.includes("127.0.0.1") &&
  !env.RUN_PRODUCTION_MIGRATIONS
) {
  throw new Error("DATABASE_URL is not allowed to be a remote URL when RUN_PRODUCTION_MIGRATIONS is not true")
}

export default defineConfig({
  schema: "./src/shared/db/schema/index.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  casing: "snake_case",
  breakpoints: true,
  strict: true,
  verbose: true,
})
