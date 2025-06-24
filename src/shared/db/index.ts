import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import env from "~/shared/env/server"
import { remember } from "~/shared/utils/remember"
import * as schema from "./schema"

export function connect() {
  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  })

  return drizzle({
    client,
    schema,
    casing: "snake_case",
  })
}

const database = remember("database", connect)

export default database
