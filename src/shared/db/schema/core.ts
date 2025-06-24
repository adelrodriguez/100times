import { constructId, createTable, index, integer, text, timestamps, uniqueIndex } from "./helpers"

export const users = createTable(
  "users",
  {
    ...constructId("UserId", "usr"),
    ...timestamps,

    role: text({ enum: ["user", "admin"] })
      .notNull()
      .default("user"),

    name: text().notNull(),
    image: text(),

    email: text().notNull().unique(),
    emailVerified: integer({ mode: "boolean" }).notNull().default(false),

    banned: integer({ mode: "boolean" }).notNull().default(false),
    banReason: text(),
    banExpiresAt: integer({ mode: "timestamp_ms" }),

    timezone: text().notNull().default("UTC"),

    metadata: text(),

    isAnonymous: integer({ mode: "boolean" }).notNull().default(false),
  },
  table => [index("users_email_idx").on(table.email), index("users_role_idx").on(table.role)],
)
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserId = User["id"]
export type UserRole = User["role"]

export const accounts = createTable(
  "accounts",
  {
    ...constructId("AccountId", "acc"),
    ...timestamps,

    userId: text()
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .$type<UserId>(),

    accountId: text().notNull(),
    providerId: text().notNull(),

    accessToken: text(),
    refreshToken: text(),

    accessTokenExpiresAt: integer({ mode: "timestamp_ms" }),
    refreshTokenExpiresAt: integer({ mode: "timestamp_ms" }),

    scope: text(),
    idToken: text(),

    password: text(),
  },
  table => [
    index("accounts_user_id_idx").on(table.userId),
    index("accounts_provider_idx").on(table.providerId),
    uniqueIndex("accounts_provider_account_unique_idx").on(table.providerId, table.accountId),
  ],
)
export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
export type AccountId = Account["id"]

export const verifications = createTable(
  "verifications",
  {
    ...constructId("VerificationId", "ver"),
    ...timestamps,

    identifier: text().notNull(),
    value: text().notNull(),

    expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
  },
  table => [
    index("verifications_identifier_idx").on(table.identifier),
    index("verifications_expires_idx").on(table.expiresAt),
    uniqueIndex("verifications_value_unique_idx").on(table.value),
  ],
)
export type Verification = typeof verifications.$inferSelect
export type NewVerification = typeof verifications.$inferInsert

export const sessions = createTable("sessions", {
  ...constructId("SessionId", "ses"),
  ...timestamps,

  userId: text()
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .$type<UserId>(),

  token: text().notNull().unique(),
  expiresAt: integer({ mode: "timestamp_ms" }).notNull(),

  impersonatedBy: text()
    .references(() => users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    })
    .$type<UserId>(),

  ipAddress: text(),
  userAgent: text(),
})
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
