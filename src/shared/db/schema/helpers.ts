import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core"
import { z } from "zod/v4"
import { generatePrefixedId } from "~/shared/utils/id"

export const createTable = sqliteTableCreator(name => name)

export const UNIQUE_ID_LENGTH = 24

export function constructId<B extends string>(_brand: B, prefix: string) {
  const IdSchema = z.string().brand(_brand)

  return {
    id: text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => generatePrefixedId(prefix, UNIQUE_ID_LENGTH))
      .$type<z.infer<typeof IdSchema>>(),
  }
}

export const timestamps = {
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
}

export * from "drizzle-orm/sqlite-core"
